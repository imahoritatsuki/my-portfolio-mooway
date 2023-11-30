'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const email = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const password = e.currentTarget.elements.namedItem("password") as HTMLInputElement;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });

      if (response.ok) {
        router.push('/chat');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'ログインに失敗しました');
      }
    } catch (error) {
      setError('通信エラーが発生しました');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <Image
            src="/images/mooway_logo.svg" 
            className="mx-auto h-12 mb-5" 
            alt="logo"
            width={600}
            height={120}
          />
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">Login</h1>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 p-2 w-full border text-gray-700 rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" name="password" className="mt-1 p-2 w-full border text-gray-700 rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" />
            </div>
            <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">Login</button>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Don’t have an account yet? <Link href="/auth/signup">Sign-up here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;