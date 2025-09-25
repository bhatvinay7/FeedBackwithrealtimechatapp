// components/SidebarToggle.tsx
'use client'
import {useState,useEffect} from 'react'
import {ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {useDispatch,useSelector} from 'react-redux'
import { sideBarState,toggleSidebar } from '@/lib/redux/featuresSlice/slideBarSlice';
import { FaBars } from 'react-icons/fa';
import { X } from "lucide-react";
export default function SidebarToggle() {
  const dispatch=useDispatch()
 
  const sideBarToggleValue=useSelector(sideBarState)
 
  
  return (
    <div className=" flex items-center  relative z-[52]   md:rounded-full w-fit   space-x-2">
      {sideBarToggleValue ? (
        <Button
          className='md:bg-gray-200 bg-gray-300 rounded-md md:rounded-full border border-black/12'
          size="icon"
          onClick={() =>  (dispatch(toggleSidebar(!sideBarToggleValue))) }
          aria-label="Close Sidebar"
        >
          <ArrowLeft className="w-5 h-5 hidden md:block " />
          <FaBars className="w-5 h-5 text-black block md:hidden " />
        </Button>
      ) : (
        <Button
          className='md:bg-gray-200 bg-gray-300 rounded-md md:rounded-full border border-black/12'
          size="icon"
          onClick={() =>  dispatch(toggleSidebar(!sideBarToggleValue)) }
          aria-label="Open Sidebar"
        >
          <ArrowRight className=" w-5 h-5 hidden md:block " />
          <X  className=" w-5 h-5 block md:hidden " />
        </Button>
      )}
    </div>
  );
}
