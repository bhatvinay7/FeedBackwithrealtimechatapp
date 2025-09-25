import useAxiosInstance from "@/lib/axiosIntercepter";
const axiosPrivate = useAxiosInstance();
export interface userFeedBack{
    rating:number,
    message:string,
    projectId:number,
    timeStamp:string
} 
type ApiResponse<T> = {
    message: T;
};
export async function postUserFeedBack(data:userFeedBack):Promise<{message:string}>{

    const response=await axiosPrivate.post<ApiResponse<string>>('/api/feedback/employee_feedback',data)
    return response.data
}