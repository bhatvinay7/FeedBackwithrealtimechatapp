import React from 'react'
import { SendHorizontal } from "lucide-react";
interface message{
    message:string
}
export default function ChatWindow({prop}:{prop:{setUserMessage:(message:{message:string})=>void,sendUserMessage:()=>void}}) {
  return (
   <>
    <div className="p-4  fixed  bottom-0 chat-scrollBar z-[40] chat-scrollbar w-3/5 mx-auto flex justify-center">
          <div className="flex items-center gap-2 bg-gray-300/45 border w-3/4 border-gray-300 rounded-md px-4 py-3 shadow-sm">
            <textarea
              rows={1}
              onChange={(e) => prop.setUserMessage({message:e.target.value as string})}
              placeholder="Type your message..."
              className=" outline-0 rounded px-4 py-2 w-full chat-scrollBar text-black/80 resize-none focus:outline-none"
            />
            

            <button
               onClick={()=>{prop.sendUserMessage()}}
              aria-label="send"
              className="text-blue-600 border z-[40]  transition-colors border-black/12 rounded-sm p-2 font-semibold hover:underline"
            >
            <SendHorizontal className="  text-slate-400 hover:text-slate-500 z-41 " />
                
            </button>
          </div>
        </div> 
   </>
  )
}
