import React from 'react'
import BullshitLogArea from './BullshitLogArea'
import TimeArea from './TimeArea'
import { getBullshitAreaData } from '../../../../../lib/supabase/getBullshitAreaData';

const LeftSide = async () => {
  const prebullshitMessages = await getBullshitAreaData()
  const messages = prebullshitMessages.reverse()
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow overflow-y-auto' style={{ maxHeight: '70vh' }}>
        <BullshitLogArea messages={messages} /> 
      </div>
      <div className='h-1/4'>
        <TimeArea />
      </div>
      
    </div>
  )
}

export default LeftSide