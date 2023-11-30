'use client'

import React from 'react'

const LogoutButton = () => {

  const handleClick = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // ログイン成功時の処理

      } else {
        // エラー処理
        console.error('ログイン失敗');
      }
    } catch (error) {
      console.log('エラーが発生しました', error);
    }
  };

  return (
    <button 
      className="button block text-sm bg-white text-gray-800 hover:text-gray-500" 
      type="submit"
      onClick={handleClick}
    >
      ログアウト
    </button>
  )
}

export default LogoutButton