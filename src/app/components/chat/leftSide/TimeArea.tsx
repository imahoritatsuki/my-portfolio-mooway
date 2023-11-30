import Image from 'next/image'
import React from 'react'

const TimeArea = () => {
  return (
    <div className='flex flex-col h-full border-t-2 border-gray-100'>
    
      <div className="mt-auto flex-col">
        <Image 
          src="/images/mooway_ushimoto_desk_1.svg" 
          className="mx-auto w-72" 
          width={500} 
          height={500} 
          alt='ushimoto-desk'
        /> 
      </div>
  </div>
  )
}

export default TimeArea