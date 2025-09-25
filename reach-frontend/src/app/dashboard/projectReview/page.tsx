'use client'
import React from 'react'
import {useState,useEffect} from 'react'
import Image from 'next/image'
import {useRouter,useParams} from 'next/navigation'
import {gettManagerFeedBackIds,managerfeedbackIds} from '@/utils/getManagerFeedBack'
export default function Page() {

 const [response,setResponse]=useState<managerfeedbackIds[] >([])
 const [errorResponse,setErrorResponse]=useState<{message:string |null}>({message:""})
 const router=useRouter()
 
    useEffect(()=>{
     async function fetch(){
         try{
                 const response=await gettManagerFeedBackIds()
                 console.log(response)
                 setResponse(response)
         }
         catch(error:any){
              setErrorResponse(error?.response?.data!)
         }

     }
     fetch()

    },[])
  return (
    <div className='w-full min-h-screen p-4 justify-start bg-blue-50'>
       {response?.length >0 && response?.map((each:managerfeedbackIds,index:number)=>{
    return <div key={each.feedbackId} onClick={()=>{router.push(`/dashboard/getManagerFeedBack/${each.feedbackId}`)}} className='w-[320px] relative h-auto  rounded-sm border border-green-500 bg-gray-300'>
            <Image src={'/review.png'} alt={"review"} className='rounded-sm relative inset-0 ' width={320} height={20} ></Image>
                   <span className='line-clamp-1 px-1.5 text-black'> {each.projectName}</span>
 
        </div>
       })}
    </div>
  )
}
