'use client'
import react from 'react'
import {useState,useEffect} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import {useParams} from 'next/navigation'
import {gettManagerFeedBackDetail} from '@/utils/getManagerFeedBack'
interface FeedbackData{
  
  project_delivery: number;
  receiverName?: string; // optional name
  work_accuracy: number;
  team_collaboration: number;
  areas_for_improvement: string;
  description: string;
}
interface updatedFeddback extends FeedbackData{
     receiverId:number;
}

interface FeedbackCardProps {
  feedback: FeedbackData;
}

const renderStars = (count: number) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-6 h-6 ${
            i <= count ? "fill-yellow-400 text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function  FeedbackCard(){
  const params=useParams<{feedbackId:string |undefined}>()
  const [response,setResponse]=useState<updatedFeddback[] >([])
  const [errorResponse,setErrorResponse]=useState<{message:string |null}>({message:""})
  useEffect(()=>{
  async function fetch(){
    try{
      const response=await gettManagerFeedBackDetail(params?.feedbackId)
      setResponse(response)
      console.log(response)
    }
    catch(error:any){
      setErrorResponse(errorResponse)

    }
    finally{


    }

  }
     fetch()
  },[])
  return (
    <div className="flex justify-center relative min-h-screen bg-gray-300/85 p-4 ">

    <Card className=" absolute top-30 p-4 w-xl  max-auto bg-blue-950/80 rounded-sm border border-black/14 ">
      <CardHeader>
        {/* <CardTitle className="text-xl">Feedback for {feedback?.receiverName || "User"}</CardTitle> */}
      </CardHeader>
       {response.length >0 && response?.map((each:updatedFeddback)=>{
         
         return(
           
           <CardContent key={each.receiverId} className="space-y-4 text-base text-gray-300">

        <div>
          <p className="font-semibold text-base text-gray-200 ">Project Delivery:</p>
          <p>{each?.project_delivery} /5</p>
        </div>

        <div>
          <p className="font-semibold text-base text-gray-200 ">Work Accuracy:</p>
          {renderStars(each?.work_accuracy)}
        </div>

        <div>
          <p className="font-semibold text-base  text-gray-200 ">Team Collaboration:</p>
          {renderStars(each?.team_collaboration)}
        </div>

        <div>
          <p className="font-semibold text-base text-gray-200  ">Areas for Improvement:</p>
          <p className="text-gray-300">{each?.areas_for_improvement}</p>
        </div>

        <div>
          <p className="font-semibold text-base text-gray-200">Description:</p>
          <p className="text-gray-300">{each?.description}</p>
        </div>
      </CardContent>
        ) 
       })}

    </Card>
    </div>
  );
};

