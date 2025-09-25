"use client";

import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "next/navigation";
import ManagerFeedBack from "@/components/ui/managerFeedback";
import SignupNotification from "@/components/ui/SuccessNotification";
import ErrorNotificationUI from "@/components/ui/errorNotification";
import { getProjectDetails, ProjectData, Member } from "@/utils/projectDetails";
import { postManagerFeedBack, FeedbackData } from "@/utils/postmanagerFeedback";

export default function Page() {
  const [selected, setSelected] = useState<number | null | undefined>(null);
  const params = useParams<{ id: string }>();
  const [errorResponse, setErrorResponse] = useState<{ message: string }>({
    message: "",
  });
  const projectId = params.id;
  const [projectData, setResponse] = useState<ProjectData>();
  const [feedbackResponse, setFeedbackResponse] = useState<{ message: string }>(
    { message: "" }
  );
  const [show, setShow] = useState<boolean>(false);

  async function setData(data: FeedbackData) {
    try {
      const updatedData = {
        ...data,
        projectId: parseInt(projectId),
        receiverId: selected,
        timeStamp: new Date().toISOString(),
      };
    
      const response = await postManagerFeedBack(updatedData);
      setFeedbackResponse(response);
      setShow(true);
    } catch (error: any) {
      setErrorResponse(error?.response?.data);
    } finally {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }

  useEffect(() => {
    async function fetch() {
      try {
        const response = await getProjectDetails(projectId);
        setResponse(response);
      } catch (error: any) {
        setErrorResponse(error.response.data);
      }
      finally{
        setErrorResponse({message:""});
      }
    }
    if (projectId) {
      fetch();
    }
  }, []);

  const toggleSelect = (id: number) => {
    setSelected(id);
  };

  return (
    <div className="p-4  max-w-4xl bg-slate-100/60  min-h-screen font-serif z-[38] relative  mx-auto">
      <SignupNotification
        prop={{
          message: feedbackResponse?.message,
          setShow: () => {},
          show:show,
        }}
      />
      <ErrorNotificationUI prop={{message: errorResponse.message }} />
      <div className="mb-6  border p-4 rounded-sm bg-cyan-700 shadow-2xl shadow-gray-300 sticky top-16 z-[37] ">
        <div className="flex items-center relative space-x-4">
          <img
            src={projectData?.picture || "/user.jpg"}
            alt="Manager"
            className=" w-16 h-16 rounded-full ring-1 ring-white"
            
          />
          <div >
            <h2 className="text-2xl text-white font-bold">
              {projectData?.projectName}
            </h2>
            <p
              className="text-slate-900  text-base
               text-wrap"
            >
              {projectData?.projectDescription}
            </p>
            <div className="mt-4">

            <p className="text-base text-gray-200 font-medium">
              <span className="text-slate-950">Manager/Admin:</span> {projectData?.managerName}
            </p>
            <p className="text-base text-gray-200">
             <span className="text-slate-950">Project Status:</span>  {projectData?.projectStatus?.toLocaleLowerCase()}
            </p>
            <p className="text-base text-gray-200">
              <span className="text-slate-950">Feedback Status: </span>{projectData?.isFeedbackOpen ? "Open":"Not Open"}
            </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" overflow-x-auto rounded-sm max-h-64 overflow-y-scroll custom-scrollBar border  border-b-black/12 ">
        <table className="w-full table-auto relative bg-gray-100 ">
          <thead className=" top-0 sticky z-[34] ">
            <tr className="font-serif border bg-gray-200 font-normal border-black/12 text-base">
              <th className="p-2 text-center"></th>
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Email</th>
              <th className="p-2 text-center">Mobile</th>
              <th className="p-2 text-center">Feedback Status</th>
              <th className="p-2  text-center">Select</th>
            </tr>
          </thead>
          <tbody className="z-[33] p-1">
            {projectData?.members &&
              projectData?.members.map((member: Member, index: number) => (
                <tr
                  key={member.id}
                  className={`border border-gray-900/12 cursor-pointer   hover:bg-yellow-50/75 text-center items-center transition-colors delay-300 ${
                    member.id == selected
                      ? "bg-green-200/35"
                      : index % 2 == 0
                      ? "bg-gray-50"
                      : "bg-blue-50"
                  }`}
                >
                  <td className="p-2 ">
                    <img
                      src={member?.picture || "/user.jpg"}
                      alt={member?.username}
                      className=" w-10 h-10 bg-slate-100  rounded-full"
                    />
                  </td>
                  <td className="p-2">{member?.username}</td>
                  <td className="p-2">{member?.emailId}</td>
                  <td className="p-2">{member?.mobilenumber}</td>
                   <td className={`p-2`}><span className={` rounded-sm ${member?.isFeedbackReceived ? "text-green-600  p-1 bg-green-200/80":"text-black/80 p-1 bg-red-300 "}`}>{member?.isFeedbackReceived ?"received":"not received"}</span></td>

                  <td className="p-2 text-center">
                    <input
                      aria-label="select"
                      type="checkbox"
                      checked={selected == member.id ? true : false}
                      onChange={() => toggleSelect(member.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ManagerFeedBack onSubmit={setData} receiverId={selected} />
    </div>
  );
}
