// app/components/ProjectForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {useState } from "react";
import {LoaderCircle} from 'lucide-react'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useAxiosInstance from "@/lib/axiosIntercepter";
import SuccessfulNotification  from "@/components/ui/SuccessNotification";

export const ProjectStatusSchema = z.enum([
  
  "PENDING", "IN_PROGRESS", "COMPLETED",'NOT_STARTED'
  
]);

export type ProjectStatusType = z.infer<typeof ProjectStatusSchema>;



type FormValues = {
  projectName: string;
  projectDiscription: string;
  projectStatus: string;
  projectStartDate: string;
  projectEndDate: string;
};


export default  function  ProjectForm() {
  const [show,setShow]=useState<boolean>(false)
  const [response,setResponse]=useState<{message:string}>({message:""})
  const [isLoader,setLoader]=useState<boolean>(false)
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>();
    
    const onSubmit = async (data: FormValues) => {

      
      console.log("Form Submitted:", data);
      try {
      setLoader(true)
      const axiosPrivate = useAxiosInstance();
      const response = await axiosPrivate.post("/api/project/create", data)
      setShow(true)
      setResponse(response.data! as {message:string})
      // const timer = setTimeout(() => setShow(false), 3000);
    } catch (error: any) {}
    finally{
    setLoader(false)       
   setTimeout(()=>{
    setShow(false)
   },4000)
    }
  };

  return (
    <div className=" min-h-screen h-full relative flex justify-start bg-gray-200 flex-1 flex-col items-center  ">
      <SuccessfulNotification
      prop={{message:response.message,show:show,setShow:()=>setShow(!show)}}
      />
      <h1 className="p-2 text-center text-3xl md:text-4xl text-green-950/60 font-serif mt-12">
        Kickstart Your Project and Invite Collaborators
      </h1>

      <Card className="min-w-xl mx-auto relative mt-10 p-6 h-auto bg-blue-50 border-0 rounded-none">
       {isLoader && <div className="absolute inset-0 flex justify-center items-center bg-black/10 "> 
             {isLoader && <LoaderCircle className=" animate-spin w-12 h-12 text-slate-400"/> }
        </div> }
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-indigo-900" htmlFor="projectName">
                Project Name
              </Label>
              <Input
                className=" border border-black/12 h-12 focus:border-blue-200  "
                id="projectName"
                placeholder="Enter project name"
                {...register("projectName", {
                  required: "Project name is required",
                })}
              />
              {errors.projectName && (
                <p className="text-sm text-red-500">
                  {errors.projectName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-indigo-900" htmlFor="projectDetails">
                Project Details
              </Label>
              <Textarea
                className="border border-blue-400/45 max-w-[540px] max-h-40 ring-1 ring-blue-200 hover:ring-blue-200/70  transition ease-in-out"
                id="projectDetails"
                placeholder="Describe the project..."
                {...register("projectDiscription", {
                  required: "Project details are required",
                })}
              />
              {errors.projectDiscription && (
                <p className="text-sm text-red-500">
                  {errors.projectDiscription.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-indigo-900" htmlFor="projectStatus">
                Project Status
              </Label>
              <select  className=" border border-black/12 h-12 p-2 focus:border-blue-200 rounded-sm w-full " {...register("projectStatus", { required: "Status is required" })}>
                <option  value="NOT_STARTED">Not Started</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
              </select>
              {errors.projectStatus && (
                <p className="text-sm text-red-500">{errors.projectStatus.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-indigo-900" htmlFor="projectStartDate">
                Start Date
              </Label>
              <Input
                className=" border border-black/12 h-12 focus:border-blue-200  "
                id="projectStartDate"
                min={new Date().toISOString().split("T")[0]}
                type="date"
                {...register("projectStartDate", { required: true })}
              />
              {errors.projectStartDate && (
                <p className="text-sm text-red-500">Start date is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-indigo-900" htmlFor="projectEndDate">
                End Date
              </Label>
              <Input
                className=" border border-black/12 h-12 focus:border-blue-200  "
                id="projectEndDate"
                min={new Date().toISOString().split("T")[0]}
                type="date"
                {...register("projectEndDate", { required: true })}
              />
              {errors.projectEndDate && (
                <p className="text-sm text-red-500">End date is required</p>
              )}
            </div>
            <div className="flex justify-center gap-1 items-center w-full ">
            <Button
              type="submit"
              disabled={isLoader}
              className="w-full h-12 text-white bg-green-950/75 hover:bg-green-950/70 "
            >
              Submit
            </Button>
            {/* {isLoader && <LoaderCircle className=" animate-spin w-10 h-10 bg-amber-800 text-blue-400"/> } */}

            </div>
          
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


// components/SuccessNotification.tsx

