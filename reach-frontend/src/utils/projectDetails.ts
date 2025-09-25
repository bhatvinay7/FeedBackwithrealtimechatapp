import useAxiosInstance from "@/lib/axiosIntercepter";
const axiosPrivate=useAxiosInstance()
export type Member = {
  id: number;
  username: string;
  emailId: string;
  mobilenumber: string;
  picture: string;
  isFeedbackReceived:number;
};

type ApiResponse<T> = {
    data: T;
};

export type ProjectData = {
  id: number;
  isFeedbackOpen:boolean;
  projectName: string;
  projectDescription: string;
  projectStatus: string;
  managerName: string;
  picture: string;
members: Member[];
};

export async function getProjectDetails(projectId:string):Promise<ProjectData>{
const response = await axiosPrivate.get<ApiResponse<ProjectData>>(`/api/project/details?projectId=${parseInt(projectId)}`);
            
        return response?.data?.data as  ProjectData 
       

}
