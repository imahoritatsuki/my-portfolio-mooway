import { NextRequest, NextResponse } from 'next/server'
import { createSupbaseServerClient } from '../../../../../lib/supabase'

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)
  
  const body = await request.text();
  const { email, password } = JSON.parse(body);

  const supabase = await createSupbaseServerClient()

  await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return NextResponse.redirect(requestUrl.origin, { status: 302 });

}