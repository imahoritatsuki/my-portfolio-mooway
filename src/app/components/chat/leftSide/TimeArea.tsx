import Image from 'next/image'
import React from 'react'

const TimeArea = () => {
  return (
    <div className='flex flex-col h-full border-t-2 border-gray-100'>
    {/* mt-autoは上のマージンを自動で適用し、要素を下部に押し下げる */}
      <div className="mt-auto flex-col">
        <Image 
          src="/images/mooway_ushimoto_desk_1.svg" 
          className="mx-auto w-72" // Next.jsのImageコンポーネントではこのクラスは適用されないので無視されます
          width={500} // 画像の実際のサイズやアスペクト比に応じて調整してください
          height={500} // 画像の実際のサイズやアスペクト比に応じて調整してください
          alt='ushimoto-desk'
        /> 
      </div>
  </div>
  )
}

export default TimeArea