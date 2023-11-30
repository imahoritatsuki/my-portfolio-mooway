'use client'
import React, { useEffect, useRef, useState } from 'react'
import { createSupbaseBrowserClient } from '../../../../../../lib/supabase/createSupbaseBrowserClient';
import Image from 'next/image';

type ChatAreaProps = {
  messages: {
    id: string;
    content: string;
    created_at: string;
    AI_MESSAGES: {
      content: string;
    }[];
  }[];
};

type AiMessageRecord = {
  id: string;
  content: string;
  user_message_id: string; // このプロパティの型を定義
  // ...他の必要なプロパティ
};

const ChatMessageArea: React.FC<ChatAreaProps> = ({ messages }) => {
  const [messagesState, setMessagesState] = useState(
    messages.map(message => ({ ...message, isLoading: false }))
  );
  const messagesEndRef = useRef<HTMLDivElement>(null); // 正しい型を割り当て

  function formatTime(dateString:string) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  

  useEffect(() => {
    const supabase = createSupbaseBrowserClient();    
    const userMessagesSubscription = supabase
    .channel('user-message-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'USER_MESSAGES' },
      (payload) => {
        setMessagesState((prev):any => [...prev, { ...payload.new, AI_MESSAGES: [], isLoading: true  }]);
      }
    )
    .subscribe()

    const aiMessagesSubscription = supabase
    .channel('ai-message-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'AI_MESSAGES' },
      (payload) => {
        const aiMessage = payload.new as AiMessageRecord; // 型アサーションを使用
        setMessagesState((prev):any => 
          prev.map(message => {
            if (message.id === aiMessage.user_message_id) {
              return { ...message, AI_MESSAGES: [...message.AI_MESSAGES, payload.new], isLoading: false };
            }
            return message;
        }));
      }
    )
    .subscribe();

    return () => {
      userMessagesSubscription.unsubscribe();
      aiMessagesSubscription.unsubscribe();
    };
    
  }, []);

  useEffect(() => {
    // 新しいメッセージが追加されたら自動スクロール
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesState]);
  return (
    <div className='px-5 '>
      {messagesState.map((message) => {
        const hasAIMessage = message.AI_MESSAGES.length > 0;

        return (
          <React.Fragment key={message.id}>
            {/* ユーザーメッセージを先に表示 */}
            <div className='flex justify-end mt-5 w-2/3 ml-auto'>
              <div className='flex flex-col py-1   '>
                <div className="flex-shrink-0 mr-1 whitespace-nowrap ml-auto">
                  <p id="chat-message-mini" className='text-xs text-gray-600 '>既読</p>
                </div>
                <div className="flex-shrink-0 mr-1 whitespace-nowrap ">
                  <p id="chat-message-mini" className='text-xs text-gray-600 '>
                    {formatTime(message.created_at)}
                  </p>
                </div>
              </div>
              <div className='chat-bubble chat-bubble-user'>
                <div className='rounded-2xl py-2 px-4 bg-chat-userMessage text-white'>
                  <p className="text-sm break-words">{message.content}</p>
                </div>
              </div>
            </div>

            {message.isLoading && (
              // ローディング中に「...」を表示
              <div className='flex justify-start mt-5 mb-2 w-2/3'>
                {/* ... アイコンなどの表示 ... */}
                <div className="flex-shrink-0 mr-2">
                  <Image 
                    src="/images/mooway_message_icon.png" 
                    className="h-8 w-8 rounded-full border border-gray-600" 
                    width={500}
                    height={500}
                    alt='icon'
                  /> 
                </div>
                <div className='chat-bubble chat-bubble-other'>
                  <div className='rounded-2xl py-2 px-4 bg-white'>
                    <p className="text-sm">...</p>
                  </div>
                </div>
              </div>
            )}

            {!message.isLoading && hasAIMessage && (
              // AIメッセージを後に表示       
              <div className='flex justify-start mt-5 mb-2 w-2/3'>
                <div className="flex-shrink-0 mr-2">
                  <Image 
                    src="/images/mooway_message_icon.png" 
                    className="h-8 w-8 rounded-full border border-gray-600" 
                    width={500}
                    height={500}
                    alt='icon'
                  /> 
                </div>
                <div className='chat-bubble chat-bubble-other'>
                  <div className='rounded-2xl py-2 px-4 bg-white'>
                    {message.AI_MESSAGES.map((aiMessage, index) => (
                      <p key={index} className="text-sm break-words">{aiMessage.content}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageArea;
