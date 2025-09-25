// import useAxiosInstance from "@/lib/axiosIntercepter";
// const axiosPrivate=useAxiosInstance()
import {axiosPrivate} from '@/lib/axios'
import { cookies } from "next/headers";
  export interface channels{
    projectId:number,
    projectName:string,
    chatType:string,
    lastMessage:string |null,
    unseenMessageCount:number,
    timeStamp:string,
    fileLink?:string | null
  }
  export async function fetchChannels():Promise<channels[]>{
  const cookieStore = cookies();
  const cookie = await  cookieStore
  const token = cookie.get('token')?.value;
     
 const response=await axiosPrivate.get('/api/getChannels/',{
    headers: {
      'Authorization': `Bearer ${token}`
    } 
 })
  return (response.data as {data:channels[]}).data


}