'use client'
import React from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {useSelector} from 'react-redux'
import {userState } from '@/lib/redux/featuresSlice/userDetails';
import { useDispatch } from 'react-redux';
import { toggleProfile } from '@/lib/redux/featuresSlice/slideBarProfileSlice';
import { X } from "lucide-react";
export default function Profile({prop}:{prop:{isOpen:boolean,isSideBarOpen:boolean,x1Value:number,x2Value:number}}) {
 const dispatch=useDispatch()
 const handleClose=()=>{
  dispatch(toggleProfile(false))
 }
  const user=useSelector(userState)
    // const receiver={
    //     picture:"",
    //     name:"vinay bhat",
    //     email:"@gmail.com",
    //     mobilenumber?:"76986979797"
    // }
    
  return (
    <AnimatePresence>
   {prop.isOpen &&
    <motion.div 
    initial={{x:-300,opacity:0}}
    animate={{x:prop.isSideBarOpen ? prop.x1Value:prop.x2Value,opacity:1,zIndex:30}}
    exit={{x:-300,opacity:0}}
    transition={{duration:0.3}}
    className={` ${prop.isOpen? "w-full": "w-0" } sm:w-[320px]  border border-r-black/12 bg-gradient-to-br from-orange-200 fixed md:h-[calc(100vh-68px)] h-full top-16 z-[41]  left-0 `}>     
    <div className=" flex absolute md:hidden right-2 top-1.5 items-center justify-between p-2">
    <X  onClick={()=>{handleClose()}} className='w-5 h-5 text-black/75 '/>
    </div>
        <Card className="w-full bg-none rounded-none  to-black/15 h-full border-0  ">
      <CardHeader className="flex flex-col  items-center  gap-4">
        <img
          src={user?.picture ? user?.picture:""}
        alt={user.username}
          className=" w-18 h-18 rounded-full border border-white ring-2  ring-gray-300 object-cover"
          loading="eager"
        />
         <CardTitle className="text-xl  text-center text-slate-700 ">{user?.username}</CardTitle>
        <div className='flex flex-col self-start items-start  space-y-3'>


         <p className=" text-black  text-base "><span className='text-black   text-lg'>Email:</span> {user?.emailId}</p>
         <p className=" text-black text-base"><span className='text-black  text-lg'>Mobile Number:</span>  {}</p>
        </div> 
      </CardHeader>
     </Card> 
      
    </motion.div>
}
        </AnimatePresence>
  )
}
