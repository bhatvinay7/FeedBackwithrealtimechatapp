import useAxiosInstance from "@/lib/axiosIntercepter";
const axiosPrivate=useAxiosInstance()

export interface Message{
    projectId:number,
    projectName:string,
    fileLink?:string,
    message?:string,
    senderId?:number,
    username?:string,
    picture?:string,
    phonenumber?:string
}

              
export async function fetchChannels():Promise<Message[]>{
     
 const response=await axiosPrivate.get('/get_users/group_message')
  return (response.data as {data:Message[]}).data


}