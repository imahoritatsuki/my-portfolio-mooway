import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr';

export default async function UserEmail() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className='flex flex-col justify-between scale-90 sm:flex-row sm:scale-100'>
      <p className='text-gray-600 text-sm'>{user ? user.email : 'Not login'}</p>
      <form 
        action={user ? "/api/auth/logout" : "/auth/login" } 
        method="post"
        className='ml-2'
      >
      <button className="button block text-sm text-gray-800 hover:text-gray-500" type="submit">
        {user ? "ログアウト": "ログイン"}
      </button>
      </form>
    </div>
  )
}