import { NextRequest, NextResponse } from 'next/server'
import { createSupbaseServerClient } from '../../../../../lib/supabase'

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)
  
  const body = await request.text();
  const { email, password } = JSON.parse(body);

  const supabase = await createSupbaseServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // エラーが発生した場合、エラーメッセージを含むレスポンスを返します。
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400, // HTTPステータスコード400（Bad Request）を設定
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return NextResponse.redirect(requestUrl.origin, { status: 302 });

}