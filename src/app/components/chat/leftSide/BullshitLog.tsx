'use client'
import React, { useState } from 'react';
import Image from 'next/image';

type bullshitLog = {
  id: string;
  content: string;
  created_at: string;
  bullshit_title: string;
  bullshit_description: string;
  bullshit_solution: string;
  AI_MESSAGES: {
    content: string;
  }[];
};

type BullshitLogProps = {
    message: bullshitLog;
  };

const BullshitLog:React.FC<BullshitLogProps> = ({message}:any) => {
  // State to manage if the content is visible
  const [isVisibleChat, setIsVisibleChat] = useState(false);
  const [isVisibleSolution, setIsVisibleSolution] = useState(false);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);
  const isButtonDisabled = Boolean(message.bullshit_solution);

  // Function to toggle the visibility
  const toggleVisibilityChat = () => {
    if (message.AI_MESSAGES && message.AI_MESSAGES.length > 0) {
      setIsVisibleChat(!isVisibleChat);
    }
  };
  const toggleVisibilitySolution = () => {
    setIsVisibleSolution(!isVisibleSolution);
  };

  function formatTime(dateString:string) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/chat/delete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ id: message.id }), 
      });
      if (!res.ok) {
        throw new Error('Response error');
      }
    } catch (error) {
      console.error('Error delete:', error);
    }
    
  }

  const handleClickSolution = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoadingSolution(true);

    try {
      const res = await fetch(`/api/openai/getSolution`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ prompt: message.content, id: message.id }), 
      });
      if (!res.ok) {
        throw new Error('Response error');
      }
      setIsLoadingSolution(false);
    } catch (error) {
      console.error('Error get solution:', error);
    }
    setIsLoadingSolution(false);
    
  }

  return (
    <div className="container mx-auto mt-5 ">
      <div>
        <div className="bg-white relative shadow-xl rounded-lg w-4/5 mx-auto break-words">
          <div className="mt-1 p-4 w-full">
            <div className="flex justify-between">
              <p className="text-center text-xs text-gray-400 font-medium">
                {formatTime(message.created_at)}
              </p>
              <button onClick={handleClickDelete} className='hover:scale-125'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="w-5 h-5 text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
            <div className='px-4 py-1 w-full'>
              <h1 className="w-full font-bold text-center text-md text-gray-900">
              {message.bullshit_title && message.bullshit_title.length > 0
                ? message.bullshit_title
                : "BullshitName"}
              </h1>
            </div>
            <p className="text-center text-xs text-gray-400 font-medium px-4">
              {message.bullshit_description}
            </p>

            {/* Toggle Button */}
            <div className="p-4 pb-1 w-full">
              <button
                onClick={toggleVisibilityChat}
                className="text-gray-600 bg-chat-bgMain rounded-md text-xs px-5 py-1 text-center w-full mx-auto flex justify-between "
              >
                <div>
                  <span>
                    チャットを読む
                  </span>
                </div>
                <div>
                  {isVisibleChat ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                      className="w-4 h-4 ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg> 
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                      className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    } 
                </div>
              </button>
            </div>

            {/* Content to toggle */}
            {isVisibleChat && (
              <div>
                <div className="flex justify-between items-center ">
                  <div className='px-2 pb-2 bg-chat-bgMain scale-90 '>
                        <div 
                          className='scale-90 p-1 flex w-4/5 justify-end ml-auto'>
                          <div className='chat-bubble chat-bubble-user'>
                            <div className='rounded-2xl py-2 px-4 bg-chat-userMessage text-white'>
                              <p className="text-sm break-words">{message.content}</p>
                            </div>
                          </div>
                      </div>     
                        <div 
                          className='scale-90 p-1 flex w-4/5 '>
                          <div className='chat-bubble chat-bubble-other'>
                            <div className='rounded-2xl py-2 px-4 bg-white'>
                              <p className="text-sm break-words">{message.AI_MESSAGES[0].content}</p>
                            </div>
                          </div>
                      </div>     
                  </div>   
                </div>
              </div>
            )}

            {/* Toggle Button */}
            <div className="p-4 pb-1 w-full">
              <button
                onClick={toggleVisibilitySolution}
                className="text-gray-600 bg-yellow-100 rounded-md text-xs px-5 py-1 text-center w-full mx-auto flex justify-between "
              >
                <div>
                  <span>
                    うし本に解決策を聞く
                  </span>
                </div>
                <div>
                  {isVisibleSolution ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                      className="w-4 h-4 ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg> 
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                      className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    } 
                </div>
              </button>
            </div>

            {/* Content to toggle */}
            {isVisibleSolution && (
              <div >
                <button 
                  onClick={handleClickSolution} 
                  className={`flex mx-auto pt-3 hover:scale-110 ${isButtonDisabled ? 'opacity-80 hover:scale-100' : ''}`}
                  disabled={isButtonDisabled}
                >
                  <Image 
                    src="/images/mooway_message_icon.png" 
                    className="h-8 w-8 rounded-full border-2  border-gray-700 " 
                    width={300}
                    height={300}
                    alt='icon'
                      /> 
                </button>
                  <div className='text-sm p-4 whitespace-pre-wrap'>
                  {isLoadingSolution ? (
                    <p className='text-center'>解決策を考え中...</p>
                  ) : (
                    message.bullshit_solution ?
                    <p>{message.bullshit_solution}</p> :
                    <p>うし本をクリックして解決策を聞いてみる</p>
                  )}
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BullshitLog;
