import { createSupbaseServerClientReadOnly } from '../../../../../lib/supabase';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = await createSupbaseServerClientReadOnly()
  const { data: { user } } = await supabase.auth.getUser()

  const { id } = await request.json();
  
  await supabase
  .from('USER_MESSAGES')
  .update({ bullshit_title: null, bullshit_description: null, bullshit_solution: null })
  .eq('id', id)

  return NextResponse.redirect(requestUrl.origin, { status: 302 });
  }

  