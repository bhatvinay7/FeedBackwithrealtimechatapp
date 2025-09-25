'use client'
import React from 'react'
import Pagination from './pagination'
import {useRouter} from 'next/navigation'
export default function ProjectButtons({props}:{props:{projectId:number | null |undefined,generateLink:()=>void,isLink:boolean,totalPages:number,setCurrentPage:(page:number)=>void}}) {
    const router=useRouter()
    const currentPage=1

  return (
  <div className=" flex  bg-black/12 top-16 font-serif font-normal backdrop-blur-[1.8px] justify-start inset-0 h-11 z-[39] fixed md:justify-end  sm:flex-row gap-1 p-1 w-full ">
  <button
    onClick={()=>{props?.projectId ?props.generateLink():()=>{}}}
    className="  hover:bg-gray-100 border-[1px] text-sm ring-1 ring-gray-300 border-gray-100 text-black w-fit px-2 py-1.5 rounded-sm bg-gray-200 transition duration-200"
  >
    Generate Link 
  </button>
  <button
    className=" hover:bg-gray-100 border-[0.8px] ring-1 ring-gray-300 text-sm border-gray-100  text-black w-fit px-2 py-1.5 rounded-sm bg-gray-200 transition duration-200"
  >
    Feedback
  </button>
 <button
    className=" hover:bg-gray-100 border-[0.8px] ring-1 ring-gray-300 text-sm border-gray-100  text-black w-fit px-2 py-1.5 rounded-sm bg-gray-200 transition duration-200"
  >
   Tiggre Feedback
  </button>


  <button
    onClick={()=>router.push(`/dashboard/projectDetails/${props.projectId}`)}
    className=" hover:bg-gray-100 border-[1px] ring-1  ring-gray-300 text-sm border-gray-100 text-black w-fit px-2 py-1.5 rounded-sm bg-gray-200 transition duration-200"
  >
    Project Detail
  </button>
  <Pagination
    prop={{ currentPage:1,totalPages:props.totalPages,onPageChange:props.setCurrentPage }}
      
  />
</div>

  )
}
