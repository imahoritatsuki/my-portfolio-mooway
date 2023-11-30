import { NextRequest, NextResponse } from 'next/server'
import { createSupbaseServerClient } from '../../../../../lib/supabase'

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const supabase = await createSupbaseServerClient()

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log(session)
  if (session) {
    await supabase.auth.signOut()
  }
  return NextResponse.redirect(`${requestUrl.origin}/auth/login`, {
    status: 302,
  })
}