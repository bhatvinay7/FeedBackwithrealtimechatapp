import useAxiosInstance from "@/lib/axiosIntercepter";
const axiosPrivate = useAxiosInstance();

export type FeedbackData = {
  receiverId: number;
  project_delivery: number;
  work_accuracy: number;
  team_collaboration: number;
  areas_for_improvement: string;
  description: string;
};

export type managerfeedbackIds={
    feedbackId:number;
    projectName:string
}
export async function gettManagerFeedBackDetail(feedbackId:string |undefined): Promise<FeedbackData[]> {
  const response = await axiosPrivate.get(`api/manager_feedback/get_feedback/detail?feedbackId=${parseInt(feedbackId!)}`);
  return (response.data as {data:FeedbackData[]} ).data
}

export async function gettManagerFeedBackIds():Promise<managerfeedbackIds[]>{
      const response = await axiosPrivate.get("api/manager_feedback/get_feedback");
      return (response.data as {data:managerfeedbackIds[]} ).data
}
