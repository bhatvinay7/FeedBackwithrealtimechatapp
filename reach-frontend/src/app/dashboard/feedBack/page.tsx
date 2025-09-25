'use client'
import React from 'react'
import {useEffect,useState} from 'react'
import { getfeedbackLinks,ProjectData } from '@/utils/getfeedbackLinks'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
export default function Page() {
  const [response,setResponse]=useState<ProjectData[] |null>()
  const router=useRouter()
  useEffect(()=>{
    async function fetch(){
      try{
        const response=await getfeedbackLinks()
         setResponse(response)
      }
      catch(error:any){

      }

    }
  fetch()
  },[])
  return (
    <div className='w-full min-h-screen flex justify-start items-start flex-wrap gap-1.5 p-4 bg-gray-100'>
      {response ? response.map((link:ProjectData,index:number)=>{
        return <div onClick={()=>{router.push(`/dashboard/userfeedBackForm/${link?.projectId}`)}} key={link?.projectId} className='w-[320px] h-40 relative hover:scale-105 transition-all delay-100 bg-slate-800 shadow-indigo-900 shadow-sm  border border-white flex flex-col items-center rounded-sm'>
          <div className='relative z-[35] w-full h-32 top-0 rounded-t-sm   bg-blue-200 '>

          <Image className=' aspect-auto opacity-100 transition-all'src={'/feedback.png'}
          //  width={128}
           alt="feedback image"  
           fill={true}>
          </Image>

          </div>
          <span className='relative font-serif line-clamp-1 text-slate-200 self-start p-1  text-base'>{link?.projectName}</span> 
       

        </div>
      }):<div className='w-full flex justify-center font-serif mt-12'>
        <h2 className='text-2xl text-teal-950 text-center'>No Feedbacks Are Available</h2>
      </div>

      }
      
    </div>
  )
}
