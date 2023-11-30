import { getBullshitDescriptionFromGpt, getBullshitSolutionFromGpt, getBullshitTitleFromGpt, openaiClient, sendBullshitOrFalseToGpt, sendPromptToGpt } from '@/openai/openai-service';
import { createSupbaseServerClientReadOnly } from '../../../../../lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = await createSupbaseServerClientReadOnly()
  const { data: { user } } = await supabase.auth.getUser()

  const { prompt, id } = await request.json();

  const gptSolutionMessage = await getBullshitSolutionFromGpt(prompt);
  
  const { data: insertMessage, error }:any = await supabase
  .from('USER_MESSAGES')
  .update([
    { bullshit_solution: gptSolutionMessage },
  ])
  .eq('id', id)
  
  return NextResponse.redirect(requestUrl.origin, { status: 302 });
}


  