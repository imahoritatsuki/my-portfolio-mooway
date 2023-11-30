import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UserEmail from './UserEmail'

const ChatHeader = () => {
  return (
    <header className='shadow sm:py-3'>
      <nav className=" bg-white border-gray-200  items-center">
          <div className="flex justify-between items-center w-full ">
              <Link href="/" className="items-center ml-4">
                  <Image 
                    src="/images/mooway_logo.svg" 
                    className="mr-5 h-5 sm:h-9 " 
                    alt="logo"
                    width={150}
                    height={30}
                  />
              </Link>
              <div id="mobile-menu-2">
                  <ul className="mr-4 ml-4 md:ml-0 md:mr-20 items-center flex flex-row space-x-4 lg:space-x-8 justify-center ">
                      <li>
                          <Link 
                            href="#" 
                            className="block  text-blue-300 rounded lg:bg-transparent " aria-current="page"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                              className="w-7 h-7  md:w-8 md:h-8 border rounded-full p-1 text-gray-400 border-gray-500 hover:border-black hover:text-gray-600">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                            </svg>
                          </Link>
                      </li>
                  </ul>
              </div>
              <div className='p-1 px-3'>
                <UserEmail/>
              </div>
          </div>
      </nav>
    </header>
  )
}

export default ChatHeader