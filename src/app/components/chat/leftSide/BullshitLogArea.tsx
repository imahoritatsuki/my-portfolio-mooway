'use client'

import React, { useEffect, useState } from 'react'
import BullshitLog from './BullshitLog'
import { createSupbaseBrowserClient } from '../../../../../lib/supabase/createSupbaseBrowserClient';

type LeftSideaProps = {
  messages: {
    id: string;
    content: string;
    created_at: string;
    bullshit_title: string;
    bullshit_description: string;
    bullshit_solution: string;
    AI_MESSAGES: {
      content: string;
    }[];
  }[];
};

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

const BullshitLogArea:React.FC<LeftSideaProps> = ({messages}) => {
  const [messagesState, setMessagesState] = useState(messages)

  useEffect(() => {
    
    const supabase = createSupbaseBrowserClient();    
    const userMessagesSubscription = supabase
    .channel('bullshit-message-channel')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'USER_MESSAGES' },
      async (payload:any) => {
        const updatedMessage = payload.new;
        const { data: relatedAIMessages, error } = await supabase
        .from('AI_MESSAGES')
        .select('content')
        .eq('user_message_id', updatedMessage.id);

        // updatedMessageのbullshit_titleがnullの場合、そのメッセージを除外
        if (updatedMessage.bullshit_title === null) {
          setMessagesState(prev => prev.filter(message => message.id !== updatedMessage.id));
        } else if (updatedMessage.bullshit_solution !== null) {
          updatedMessage.AI_MESSAGES = relatedAIMessages;
          setMessagesState(prev => {
            const filteredMessages = prev.filter(message => message.id !== updatedMessage.id);
            return [updatedMessage, ...filteredMessages];
          });
        } else if (relatedAIMessages) {
          updatedMessage.AI_MESSAGES = relatedAIMessages;
          setMessagesState(prev => [updatedMessage, ...prev]);
        }
      })
      .subscribe();

    return () => {
      userMessagesSubscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className='p-6 pb-0 text-center'>
        <h2>本日のブルシットワーク</h2>
      </div>
      {messagesState.map((message: bullshitLog) => {
        
        if (message.bullshit_title && message.bullshit_title.length > 0) {
          return (
            <div key={message.id}>
              <BullshitLog message={message} />
            </div>
          );
        }
        return null; 
      })}
    </div>
  );
};

export default BullshitLogArea