"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserFeedBack, userFeedBack } from "@/utils/getuserFeedback";
import StarRating from "@/components/ui/Rating";
import ErrorNotificationUi from "@/components/ui/errorNotification";
import Image  from 'next/image'
export default function GetuserFeedBack() {
  const params = useParams<{ projectId: string | undefined }>();
  const [response, setResponse] = useState<userFeedBack[] | []>();
  const [errorResponse,setErrorResponse]=useState<{message:string}>({message:""})
  useEffect(() => {
    async function fetch() {
      try {
        const response = await getUserFeedBack(parseInt(params.projectId!));
        setResponse(response);
      } catch (error: any) {
        setErrorResponse(error.response.data);
       
      } finally {
        setTimeout(()=>{
            setErrorResponse({message:""})
        },4000)
      }
    }
    if (params?.projectId) {
      fetch();
    }
  }, []);
  return <div className="min-h-screen w-full flex justify-center font-sans bg-gray-200">
          <ErrorNotificationUi
           prop={{message:errorResponse.message}}
          />
          <div className=" w-2xl h-auto   flex  flex-col gap-2 p-2 ">

         
          {response && response?.map((each:userFeedBack,index:number)=>{
            return (
            <div key={index} className=" w-full h-auto relative rounded-sm bg-[#E8E8E8] border p-3 border-black/12  ">
            <div className='flex justify-start gap-2 items-center'>    
            <Image className=" self-cenetr rounded-full" src={each.picture} alt={`${each.username}`} width={40} height={40} ></Image>    
            <p>{each.username}</p>   
             </div> 
             {/* <p>{each.emailId}</p>     */}
            <div className="mt-2 p-2.5 ">
               <div>
                {/* <StarRating
                  
                  /> */}
             </div>   
            <p>{each.message}</p>    
            </div>  
            <div className="w-full flex justify-end ">
            <span className="">{each.timeStamp}</span>
                
                </div>    
            </div>    



         ) })     
          
        }
                
        
          
          </div> 

  </div>;
}
