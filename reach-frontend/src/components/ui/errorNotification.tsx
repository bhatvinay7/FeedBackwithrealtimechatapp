import React from 'react'
import {motion,AnimatePresence} from 'framer-motion'
export default function ErrorNotificationUi({prop}:{prop:{message:string | null}}) {
  return (
     <AnimatePresence>
    {prop.message &&   
     <motion.div
     initial={{y:-50,opacity:0}}
     animate={{y:0,opacity:1}}
     exit={{y:-50,opacity:0}}
     transition={{duration:0.3,}}
     className=" inset-0 h-fit top-20 fixed w-full    z-[50] flex justify-center "

      
     >
           <h1 className='border-[0.8px] rounded-sm border-red-400 z-[50] bg-red-50 text-center p-4 text-red-500 font-serif'>{prop.message && decodeURI(prop.message)}</h1>
     </motion.div> }

     </AnimatePresence>
  )
}
