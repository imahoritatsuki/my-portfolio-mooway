
import { getBullshitDescriptionFromGpt, getBullshitTitleFromGpt, openaiClient, sendBullshitOrFalseToGpt, sendPromptToGpt } from '@/openai/openai-service';
import { createSupbaseServerClientReadOnly } from '../../../../../lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createSupbaseServerClientReadOnly()
  const { data: { user } } = await supabase.auth.getUser()

  const { prompt } = await request.json();

  const gptResponseMessage = await sendPromptToGpt(prompt);

  const response = NextResponse.json(gptResponseMessage)
  
  return response;
  }