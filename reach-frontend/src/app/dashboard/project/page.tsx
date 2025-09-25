"use client";
import React, { useState, useEffect } from "react";
import useAxiosInstance from "@/lib/axiosIntercepter";
import { Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";
import { motion,AnimatePresence } from "framer-motion";
import { fetchProjects,ProjectResponse } from "@/utils/getProjects";
import {generateInviteLink} from "@/utils/generateInviteLink";
import ProjectButtons from '@/components/ui/projectButtons'

export default function Project() {
  const [response, setResponse] = useState<ProjectResponse>({totalPages: 0, projects: []});
  const [selectedRowId, setSelectedRows] = useState<number |null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [url, SetUrl] = useState<null | string>(null);
  const [isLink,generateLink]=useState<boolean>(false)
  const hostname = process.env.NEXT_PUBLIC_FRONTEND_API_URL;

  useEffect(() => {
    async function fetch() {
      try {
        const response = await fetchProjects(currentPage);
        setResponse(response);
        console.log(response)
      } catch (error: any) {
        console.log(error);
      }
    }

    fetch();
  }, []);

  async function generateURL(projectId:number){
    try{
      if(projectId){

      const response= await generateInviteLink(projectId);
      SetUrl(`${hostname}${response?.invite_link as string}`);
      }
    }
    catch(error:any){
      console.log(error)
    }

    }


  const handleSelectRow = (projectId: number) => {
    setSelectedRows(projectId)
  };

  return (
    <div className=" max-h-screen   top-8  z-[36]  relative p-4">
       <ProjectButtons
       props={{projectId:selectedRowId!,generateLink:()=>generateLink(true),isLink:isLink,totalPages:response?.totalPages,setCurrentPage:setCurrentPage}}
       />
        <AnimatePresence>

      {selectedRowId && isLink ?
      <motion.div 
      
      // initial={{}}
      
      className=" min-h-screen fixed  z-[36] inset-0 top-16 w-full flex justify-center items-center  bg-black/10 backdrop-blur-[1.5px]">
      {/* <AnimatePresence>

      {selectedRowId &&
      <motion.div
      initial={{ x: 384, opacity: 0.05 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 384, opacity: 0.8 }}
      transition={{ duration: 0.4 }}
      className={`  fixed z-[39] h-[calc(100vh-80px)] rounded-sm bg-slate-200/75 backdrop-blur-[1.6px] custom-scrollbar overflow-y-scroll  w-sm top-1.5 right-1.5  `}
      ></motion.div>
      }
      </AnimatePresence>  */}
      
            {isLink && selectedRowId ?
        <div className=" w-xl h-80 bg-slate-200 relative rounded-md flex  flex-col justify-center items-center p-3  gap-2 ">
          <div className="absolute right-4 top-4 ">
            <button
              type="button"
              aria-label="Close"
              onClick={() => {setSelectedRows(null),generateLink(false)}}
              className="text-black/60 hover:text-red-900"
              >
              <X className="w-6 h-6" />
            </button>
          </div>
          <h1 className="text-2xl font-semibold text-blue-600 font-serif text-center">
            Generate your project link to connect with others
          </h1>
          <div>
            <Button
              onClick={() => {
               generateURL(selectedRowId);
              }}
              className=" border-[0.5px] border-gray-500 p-3 text-slate-900 rounded-full bg-yellow-200 hover:bg-yellow-200/75"
            >
              continue
            </Button>
          </div>
          <div className="text-start p-1.5 mt-3">
            <span className="text-base text-wrap text-blue-400 font-serif">
              {url}
            </span>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            <button
              // onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            <button
              // onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-800"
              >
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
          </div>
        </div>
:<></>}  
      </motion.div>
:<></>}
              </AnimatePresence>
      <table className="min-w-full divide-y rounded-sm relative inset-0 z-[30] ">
        <thead className="bg-orange-400 text-white  ">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Project ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Project Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Start Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              End Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Manager Name
            </th>
            <th className="px-4 py-3">
              {/* <input
                type="checkbox"
                aria-label='select'
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(response.map((p) => p.projectId))
                  } else {
                    setSelectedRows([])
                  }
                }}
                checked={
                  response.length > 0 &&
                  selectedRows.length === response.length
                }
              /> */}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y font-serif divide-gray-100 border border-black/14 ">
          {response?.projects?.map((project: any, index: number) => (
            <tr
              key={project.projectId}
              className={` hover:bg-yellow-100/70 border border-black/12 ${index % 2 === 0 ? selectedRowId ==  project.projectId ? "!important bg-green-200" :  "bg-slate-100/75"  :selectedRowId ==  project.projectId ? "!important bg-green-200" : "bg-gray-100"}`}
            >
              <td className="px-4 py-3">{project.projectId}</td>
              <td className="px-4 py-3">{project.projectName}</td>
              <td className="px-4 py-3 capitalize">{project.projectStatus}</td>
              <td className="px-4 py-3">{project.projectStartDate}</td>
              <td className="px-4 py-3">{project.projectEndDate}</td>
              <td className="px-4 py-3">{project.managerName}</td>
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRowId == project.projectId}
                  onChange={() => handleSelectRow(project.projectId)}
                  aria-label="select"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
