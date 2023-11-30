
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
  const response = NextResponse.json(userMessageId)
  return response;
  }

  