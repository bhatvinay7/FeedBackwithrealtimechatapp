import useAxiosInstance from "@/lib/axiosIntercepter";
const axiosPrivate = useAxiosInstance();

type ApiResponse<T> = {
   data: T;
};
export type ProjectData={
    projectName:string,
    projectId:number

}

export async function getfeedbackLinks():Promise<ProjectData[]>{

    const response=await axiosPrivate.get<ApiResponse<ProjectData[]>>('/api/get/project/feedback')
    return response.data.data
}