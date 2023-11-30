'use client'

import React, { useState } from 'react'

const ChatForm = () => {
  
  const [input, setInput] = useState<string>("")
  const maxLength = 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");

    let userMessageId 
    let aiMessage 
    let bullBool

    try {
      const res = await fetch(`/api/openai/insMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ prompt: input }), 
      });

      if (!res.ok) {
        throw new Error('001:サーバーエラーが発生しました。');
    }

      userMessageId = await res.json();
      console.log("userMessageId", userMessageId)
    } catch (error) {
      alert("001:エラーが発生しました。ページをリロードします。");
      window.location.reload();
      return;
    }

    try {
      const res = await fetch(`/api/openai/getAiMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ prompt: input, user_message_id: userMessageId }), 
      });

      if (!res.ok) {
        throw new Error('002:サーバーエラーが発生しました。');
    }
      aiMessage = await res.json();
      console.log("aiMessage",aiMessage)
    } catch (error) {
      alert("002:エラーが発生しました。ページをリロードします。");
      window.location.reload();
      return;
    }

    try {
      const res = await fetch(`/api/openai/insAiMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ ai_message: aiMessage, user_message_id: userMessageId }), 
      });
      if (!res.ok) {
        throw new Error('003:サーバーエラーが発生しました。');
    }
      aiMessage = await res.json();
    } catch (error) {
      alert("003:エラーが発生しました。ページをリロードします。");
      window.location.reload();
      return;
    }

    try {
      const res = await fetch(`/api/openai/getBullBool`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ prompt: input }), 
      });
      if (!res.ok) {
        throw new Error('004:サーバーエラーが発生しました。');
    }
      bullBool = await res.json();
      console.log("bullBool", bullBool)
    } catch (error) {
      alert("004:エラーが発生しました。ページをリロードします。");
      window.location.reload();
      return;
    }

    if (bullBool === "true") {
      try {
        const res = await fetch(`/api/openai/getBullContent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({ prompt: input, user_message_id: userMessageId }), 
        });
        if (!res.ok) {
          throw new Error('005:サーバーエラーが発生しました。');
      }
      } catch (error) {
        alert("005:エラーが発生しました。ページをリロードします。");
        window.location.reload();
        return;
      }
    }
    
  }
    
  return (
    <div className='bg-chat-bgForm py-3 flex flex-row justify-between'>
      <div className='w-10/12 ml-5 2xl:ml-5 md:w-11/12 md:ml-2 md:scale-100'>
        <form 
        className='flex justify-center items-center  gap-2'
        onSubmit={handleSubmit}
        >
          <div className='flex items-center py-1 flex-grow bg-white rounded-3xl outline-none'>
            {/* Input フィールド */}
            <input 
              className='w-full bg-transparent p-2 px-4 rounded-3xl outline-none' 
              type='text' 
              placeholder='メッセージを入力...' 
              value={input}
              onChange={handleChange}
              maxLength={maxLength}
            />
            {/* ボタン */}
            <button type='submit' 
              className={`mx-3 bg-chat-bgForm rounded-full p-2 ${
                input === "" ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
              disabled={input === ""} >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
        <div className={`'text-right text-xs my-auto mr-1 md:mr-3 2xl:mr-5 ${input.length == maxLength ? 'text-black' : 'text-white'}`}>
          <p className='pl-2'>{input.length}/{maxLength}</p> 
        </div>
  </div>
  )
}

export default ChatForm