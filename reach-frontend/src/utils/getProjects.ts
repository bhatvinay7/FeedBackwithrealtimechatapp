import useAxiosInstance from "@/lib/axiosIntercepter";
const axiosPrivate=useAxiosInstance()

export interface channels{
    projectId:number,
    projectName:string,
    managerName:string,
    managerId:number,           
    members_count:number,
    projectStatus:number,
    projectStartDate:string,
    projectEndDate:string,
}

export interface ProjectResponse{
    totalPages: number;
    projects: channels[];
}
   

export async function fetchProjects(index:number):Promise<ProjectResponse>{
     
 const response=await axiosPrivate.get(`/api/project/info?index=${index}`)
  return (response.data as {data:ProjectResponse}).data


}