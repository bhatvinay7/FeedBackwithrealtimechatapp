"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import useAxiosInstance from "@/lib/axiosIntercepter";
import { useParams } from "next/navigation";
import SignupNotification from "@/components/ui/notificatinUi";
import ErrorNotificationUi from "@/components/ui/errorNotification";
export default function InvitePage() {
  const axiosPrivate = useAxiosInstance();
  const [response, setResponse] = useState<{ message: string }>({
    message: "",
  });
  const [show, setShow] = useState<boolean>(false);
  const [mobile, setMobile] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId;
  const unqId = params.unqId;
  console.log(groupId);

  const handleGenerateInvite = async () => {
    // if (!mobile.match(/^\d{10}$/)) {
    try {
      setShow(true);
      const userResponse = await axiosPrivate.get("/api/project/info");
      const info = await axiosPrivate.post(
        `/api/invite/accept?groupId=${groupId}&unqId=${unqId}`,
        { mobilenumber: mobile }
      );
      console.log(info.data);
      setResponse(info?.data as { message: string });
    } catch (error: any) {
 setResponse(error?.response?.data as { message: string });

    } finally {
      setTimeout(() => {
        setShow(false);
      }, 4000);
    }
    // }
    // setInviteLink(`https://yourapp.com/join/${mobile}`);
  };

  return (
    <div className="min-h-screen flex items-center bg-blue-50/50 justify-center flex-col gap-y-6">
      <Header prop={{ hide: true }} />
      <SignupNotification
        prop={{
          message: response.message,
          show: show,
          setShow: () => setShow(!show),
        }}

      />
      <ErrorNotificationUi
      prop={{message:response.message}}
      />
      <div className="flex flex-col justify-center items-center gap-y-3 ">
        <p className="text-3xl text-slate-900 lg:text-2xl font-serif">
          Already have an account sign as Employee/User
        </p>
        <Button
          onClick={() =>
            router.push(`/signin?from=${encodeURIComponent("/invite")}`)
          }
          className="bg-indigo-900 hover:bg-indigo-900/75 transition ease-in text-white w-fit rounded-3xl "
        >
          Sign In
        </Button>
      </div>
      <div className="flex flex-col   justify-center items-center gap-y-3 ">
        <p className="text-3xl  text-slate-900 lg:text-2xl font-serif ">
          Don't have an account
        </p>
        <Button
          onClick={() => router.push("/signup")}
          className="bg-indigo-900 hover:bg-indigo-900/75 transition ease-in text-white w-fit rounded-3xl"
        >
          Sign up to continue
        </Button>
      </div>
      <div className="bg-white shadow-md p-6 mt-8 rounded-sm  max-w-md w-full">
        <h2 className="text-xl font-semibold font-serif text-center text-slate-800/60 mb-4">
          Invite User to Group/Chat
        </h2>
        <Input
          type="text"
          placeholder="Enter Mobile Number"
          className="mb-3 border-[0.8px] border-blue-300 "
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <Button
          className="bg-blue-200 w-full my-3"
          onClick={handleGenerateInvite}
        >
          Accept the invite
        </Button>
        {inviteLink && (
          <div className="p-3 bg-green-50 text-sm text-green-700 rounded-md break-words">
            Invite Link:{" "}
            <a href={inviteLink} className="underline">
              {inviteLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
