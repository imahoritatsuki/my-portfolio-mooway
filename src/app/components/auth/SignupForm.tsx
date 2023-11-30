'use client'

import Image from 'next/image';
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { z } from 'zod';


const signupSchema = z.object({
  email: z.string().email({ message: "無効なメールアドレスです。" }),
  password: z.string().min(6, { message: "パスワードは6文字以上である必要があります。" }),
});


const SignupForm = () => {
  const [responsed, SetResponsed] = useState(false)
  const [responsedMessage, SetResponsedMessage] = useState(false)
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    
    try {

      signupSchema.parse({ email, password });

      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data === 'duplication') {
        SetResponsedMessage(true)
      } else if (data === 'ok') {
        SetResponsed(true);
      } else {
        throw new Error('エラーが発生しました')
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map(err => err.message));
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-full bg-gray-100  flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <Image
            src="/images/mooway_logo.svg" 
            className="mx-auto h-12 mb-5" 
            alt="logo"
            width={600}
            height={120}
          />
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign up</h1>
          {responsed && (
            <div className="my-4 text-sm text-blue-600 text-center">
              <p>メールアドレスに確認メールを送信しました。</p>
              <p>本文内のURLをクリックし、ログインしてください。</p>
            </div>
          )}
          {responsedMessage && (
            <div className="my-4 text-sm text-red-600 text-center">
              <p>既に登録されているメールアドレスです</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <!-- Your form elements go here --> */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text" 
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
                className="mt-1 p-2 w-full text-gray-700 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign Up</button>
            </div>
            <div>
              {errors.length > 0 && (
                <div className="my-4 text-sm text-red-600">
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Already have an account? <Link href="/auth/login" className="text-black hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm