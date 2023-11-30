
import { getBullshitDescriptionFromGpt, getBullshitTitleFromGpt, openaiClient, sendBullshitOrFalseToGpt, sendPromptToGpt } from '@/openai/openai-service';
import { createSupbaseServerClientReadOnly } from '../../../../../lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createSupbaseServerClientReadOnly()
  const { data: { user } } = await supabase.auth.getUser()

  const { prompt } = await request.json();

  const gptbullshitOrFalse = await sendBullshitOrFalseToGpt(prompt);

  console.log("これはbullshitOrFalse",gptbullshitOrFalse)
  const response = NextResponse.json(gptbullshitOrFalse)
  return response;
  }

  