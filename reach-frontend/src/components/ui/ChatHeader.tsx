
import React from 'react'
import {Users} from 'lucide-react'
export default function ChatHeader({prop}:{prop:{projectName:string}}) {
  return (
    <div className='w-full  fixed font-serif top-0 z-[40] h-16 flex gap-2 justify-start items-center border-[1px] p-3 bg-[#E8E8E8] border-b-black/15'>
        <Users className={` ${prop.projectName ?"visible":"invisible"} w-10 h-10 bg-white text-black/20 rounded-full`}/>
       <span className='text-indigo-950/80 text-lg font-semibold '>{prop.projectName}</span>
    </div>
  )
}
