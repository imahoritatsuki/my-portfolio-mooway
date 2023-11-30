import React from 'react'
import { readUserSession } from '../../../lib/supabase/readUserSession'
import LogoutButton from '../components/auth/LogoutButton'
import Link from 'next/link'

const page = async () => {

  const { data: { session } } = await readUserSession()
  const user = session?.user
  return (
    <>
      <h1>Chat page</h1>
      <h2>Email: {user?.email}</h2>
      <LogoutButton />
      <Link href="/auth/login" >ログインフォームへ</Link>
    </>

  )
}

export default page