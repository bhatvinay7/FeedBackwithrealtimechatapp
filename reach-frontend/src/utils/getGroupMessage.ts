import useAxiosInstanec from '@/lib/axiosIntercepter'
const axiosPrivate=useAxiosInstanec()
export interface group_message{
message:string |null,
filelink:string | null,
userId:number,
timeStamp:string,
username:string,
picture:string,
phoneNumber?:string|null  
isDelevered:boolean,
isMessageSeen:boolean,
}

export async function getAllMessages(projectId:number):Promise<group_message[]>{
   const response=await axiosPrivate.get(`/api/get_users/group_message?projectId=${projectId}`)
   return (response.data  as {data:group_message[]}).data

}

