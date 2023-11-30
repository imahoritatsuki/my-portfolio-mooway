
import { getBullshitDescriptionFromGpt, getBullshitTitleFromGpt, openaiClient, sendBullshitOrFalseToGpt, sendPromptToGpt } from '@/openai/openai-service';
import { createSupbaseServerClientReadOnly } from '../../../../../lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createSupbaseServerClientReadOnly()
  const { data: { user } } = await supabase.auth.getUser()

  const { ai_message, user_message_id } = await request.json();

  const { data: AI_MESSAGES, err }:any = await supabase
  .from('AI_MESSAGES')
  .insert([
    { content: ai_message, user_message_id: user_message_id },
  ])
  .select()

  const response = NextResponse.json(AI_MESSAGES)

  return response;
  }

  