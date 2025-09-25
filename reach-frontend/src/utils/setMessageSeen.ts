import useAxiosInstance from "@/lib/axiosIntercepter";
const axiosPrivate=useAxiosInstance()

export interface Message{
    message:string
}
export async function updateMessageStatus(projectId:number):Promise<Message>{
     
 const response=await axiosPrivate.post('/api/get_users/update_message_status',{projectId})
  return (response.data as {data:Message}).data


}