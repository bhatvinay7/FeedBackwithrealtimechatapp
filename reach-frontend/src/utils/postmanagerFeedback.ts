import useAxiosInstance from "@/lib/axiosIntercepter";
const axiosPrivate = useAxiosInstance();

export type FeedbackData = {
  receiverId: number | null | undefined;
  project_delivery: number;
  work_accuracy: number;
  team_collaboration: number;
  areas_for_improvement: string;
  description: string;
};

type message = {
  message: string;
};
export async function postManagerFeedBack(
  data: FeedbackData
): Promise<message> {
  const response = await axiosPrivate.post("/api/manager_feedback/post", data);
  return (response as { data: { message: string } }).data;
}
