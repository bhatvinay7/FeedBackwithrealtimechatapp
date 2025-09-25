import useAxiosInstance from "@/lib/axiosIntercepter";
const axiosPrivate = useAxiosInstance();
import {userFeedBack as feedback} from './postEmployeeFeedback'


export interface userFeedBack extends feedback{
    username:string,
    emailId:string,
    picture:string,


} 
type ApiResponse<T> = {
    data: T;
};
export async function getUserFeedBack(id:number |undefined):Promise<userFeedBack[]|[]>{

    const response=await axiosPrivate.get<ApiResponse<userFeedBack[]>>(`/api/feedback/get_employee_feedback?projectId=${id}`)
    return response.data.data
}