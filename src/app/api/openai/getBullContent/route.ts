import { getBullshitDescriptionFromGpt, getBullshitTitleFromGpt, openaiClient, sendBullshitOrFalseToGpt, sendPromptToGpt } from '@/openai/openai-service';
import { createSupbaseServerClientReadOnly } from '../../../../../lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createSupbaseServerClientReadOnly()
  const { data: { user } } = await supabase.auth.getUser()

  const { prompt, user_message_id } = await request.json();

  const gptBullshitTitle = await getBullshitTitleFromGpt(prompt)
  const gptBullshitDescription = await getBullshitDescriptionFromGpt(prompt)

  const { data: BULLSHIT_CONTENTS, err }:any = await supabase
  .from('USER_MESSAGES')
  .update([
    { bullshit_title: gptBullshitTitle, bullshit_description: gptBullshitDescription },
  ])
  .eq('id', user_message_id)
  .select()
  
  const response = NextResponse.json(BULLSHIT_CONTENTS)
  return response;
  }

  