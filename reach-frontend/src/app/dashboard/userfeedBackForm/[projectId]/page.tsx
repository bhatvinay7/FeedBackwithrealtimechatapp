"use client";
import {useState} from 'react'
import { useParams } from "next/navigation";
import FeedbackForm from "@/components/ui/userFeedBack";
import { postUserFeedBack, userFeedBack } from "@/utils/postEmployeeFeedback";
import SignupNotification from '@/components/ui/SuccessNotification'
import ErrorNotification from '@/components/ui/errorNotification';

const FeedbackPage = () => {
  const params = useParams<{ projectId: string }>();
  const [response,setResponse]=useState<{message:string | null}>({message:"" })
  const [errorResponse,setErrorResponse]=useState<{message:string | null}>({message:"" })
  const handleFeedbackSubmit = async (data: {
    message: string;
    rating: number;
  }) => {
    try {
      const updateData = { ...data, projectId:parseInt(params.projectId),timeStamp:new Date().toISOString() };
      console.log(updateData)
      const response = await postUserFeedBack(updateData as userFeedBack);

      setResponse(response)
    } catch (error: any) {

      setErrorResponse(error.response.data)
    }
    finally{
      setTimeout(()=>{
        setResponse({message:null})
        setErrorResponse({message:""})
      },5000)
    }
  };

  return (
    <div className="p-4">
      <SignupNotification
      prop={{message:response?.message,show:response?.message ? true:false,setShow:()=>{}}}
      />
      <ErrorNotification
      prop={errorResponse}
      />
      <h1 className=" text-2xl text-center text-slate-800/75 font-bold font-serif mb-4">
        Leave Your Feedback Here
      </h1>
      <FeedbackForm onSubmit={handleFeedbackSubmit} />
    </div>
  );
};

export default FeedbackPage;
