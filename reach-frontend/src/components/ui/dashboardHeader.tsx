'use client'
import React from 'react'
import ProjectButtons from './projectButtons'
import SidebarToggle from './sidebarToggleComponent'
export default function DashboardHeader() {
  return (
    <div className=' w-full border border-b-black/12 fixed flex justify-start items-center z-[42] h-16 bg-blue-50 p-1.5 '>
     {/* <ProjectButtons/> */}
     <div className="  relative md:hidden block bottom-1.5 left-1.5">
      <SidebarToggle />
   
           </div>
    </div>
  )
}