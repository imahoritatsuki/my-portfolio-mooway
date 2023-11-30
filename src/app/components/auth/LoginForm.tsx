'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'

const LoginForm = () => {
  const router = useRouter()

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // ログイン成功時の処理
        router.push('/chat');
      } else {
        // エラー処理
        console.error('ログイン失敗');
      }
    } catch (error) {
      // console.log('エラーが発生しました', error);
    }
  };
  return (
    <div className="flex h-screen">
      {/* <!-- Right Pane --> */}
      <div className="w-full bg-gray-100  flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">Login</h1>          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <!-- Your form elements go here --> */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="mt-1 p-2 w-full text-gray-700 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="mt-1 p-2 w-full border text-gray-700 rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Don’t have an account yet? <Link href="/auth/signup" className="text-black hover:underline">Sign-up here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm