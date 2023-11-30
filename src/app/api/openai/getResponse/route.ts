
import { getBullshitDescriptionFromGpt, getBullshitTitleFromGpt, openaiClient, sendBullshitOrFalseToGpt, sendPromptToGpt } from '@/openai/openai-service';
import { createSupbaseServerClientReadOnly } from '../../../../../lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createSupbaseServerClientReadOnly()
  const { data: { user } } = await supabase.auth.getUser()

  const { prompt } = await request.json();

  // promptをSupabaseのデータベースに追加する
  
  const { data: insertMessage, error }:any = await supabase
  .from('USER_MESSAGES')
  .insert([
    { content: prompt },
  ])
  .select()

  const userMessageId = insertMessage[0].id

  const gptResponseMessage = await sendPromptToGpt(prompt);
  const response = NextResponse.json({ gptResponseMessage })

  const gptbullshitOrFalse = await sendBullshitOrFalseToGpt(prompt);

  

  // GPTからのレスポンスをAI_MESSAGESに追加する
  const { data: AI_MESSAGES, err }:any = await supabase
  .from('AI_MESSAGES')
  .insert([
    { content: gptResponseMessage, user_message_id: userMessageId },
  ])
  .select()
        
  if (gptbullshitOrFalse == "true") {
    const gptBullshitTitle = await getBullshitTitleFromGpt(prompt)
    const gptBullshitDescription = await getBullshitDescriptionFromGpt(prompt)

    // BullshitのタイトルをBULLSHIT_CONTENTSに追加する
    const { data: BULLSHIT_CONTENTS, err }:any = await supabase
    .from('USER_MESSAGES')
    .update([
      { bullshit_title: gptBullshitTitle, bullshit_description: gptBullshitDescription },
    ])
    .eq('id', userMessageId)
    .select()

  }
  return response;
  }