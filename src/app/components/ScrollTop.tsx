'use client'

import Image from 'next/image';
import React from 'react'

const ScrollTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // スムーズスクロールを有効にする
    });
  };

  return (
    <div>
      <div className='flex flex-col'>
        <div className='text-center ' >
          page top
        </div>
        <div className='z-0'>
          <Image
            src="/images/mooway_landingpage_foot.svg" 
            className="mx-auto h-16 transition duration-100  translate-y-3  transform hover:-translate-y-0 cursor-pointer" 
            alt="logo"
            width={100}
            height={120}
            onClick={scrollToTop}
          />
        </div>
        <footer className='bg-gray-700 z-10'>
          <div className='text-white text-center text-xs py-3'>
            2023 my portfolio
          </div>
        </footer>
      </div>
    </div>
  )
}

export default ScrollTop