import React from 'react'
import { Lilita_One } from "next/font/google";

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lilita",
});

export default function Header({prop}:{prop:{hide:boolean}}) {
  return (
    <div className={`  fixed top-0 z-35 h-16 w-full p-2 self-start bg-blue-50  text-gray-700 flex items-center justify-between `}>
        <h1 className={` ${lilita.className} text-4xl text-shadow-gray-400 text-violet-700 ml-3`} >reach</h1>
       {!prop.hide ? <div className='w-fit flex items-center
         justify-between gap-2 mr-8 '>
            <button type="button" className='border-gray-500/15 w-[70px] font-normal hover:bg-violet-400 bg-violet-400/75 text-black p-1.5 text-[16px]  border-[1px] rounded-md '>Login</button>
            <button type="button" className='border-gray-500/15 font-normal w-[70px] text-black hover:bg-violet-400 p-1.5  bg-violet-400/75 text-[16px] border-[1px] rounded-md '>sign up</button>
        </div>:<></> }
    </div>
  )
}
