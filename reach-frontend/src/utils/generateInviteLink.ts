import useAxiosInstance from "@/lib/axiosIntercepter";

const axiosPrivate = useAxiosInstance();


export type InviteLinkResponse = {
  invite_link: string;
};

export async function generateInviteLink(projectId: number): Promise<InviteLinkResponse> {
  try {
    const response = await axiosPrivate.get(`/api/invite/generate/invite_link?groupId=${projectId}`);
    return (response as {data:InviteLinkResponse}).data
  } catch (error) {
    console.error("Error generating invite link:", error);
    throw error;
  }
}