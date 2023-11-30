import React, { Suspense } from 'react'
import ChatForm from './ChatForm'
import ChatMessageArea from './message/ChatMessageArea'
import { getChatAreaData } from '../../../../../lib/supabase/getChatAreaData'


const ChatArea = async () => {
  const messages = await getChatAreaData()
  return (
    <div className='flex flex-col h-full '>
      <div className='flex-grow overflow-y-auto' style={{ maxHeight: '82vh' }}>
        <ChatMessageArea messages={messages}/>
      </div>
      <div>
          <ChatForm />  
      </div>
    </div>
  )
}

export default ChatArea