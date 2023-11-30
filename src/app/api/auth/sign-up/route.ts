import { NextResponse } from 'next/server'
import { createSupbaseServerClient } from '../../../../../lib/supabase'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const body = await request.text();
  const { email, password } = JSON.parse(body);
  const supabase = await createSupbaseServerClient()
  let res = 'ok';

  // 現在のユーザーセッションをチェック
  const { data: { session } } = await supabase.auth.getSession()

  // ユーザーがログインしている場合はサインアップ処理をスキップ
  if (session) {
    return NextResponse.redirect(`${requestUrl.origin}/chat`, {
      status: 302, // 一時的リダイレクト
    })
  }
  console.log("aaa")
  // ユーザーがログインしていない場合はサインアップ処理を実行
  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/login`,
    },
  })
  .then(({ data, error }) => {
    console.log("bbb")
    if (error) {
      console.log(error)
      return error;
    }
    console.log("",data)
    // 登録されているメールアドレスの場合、空の配列が返ってくる。
    const identities = data.user?.identities;
    console.log(data)
    if (identities?.length === 0) {
      res = 'duplication'
    }
  });

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
