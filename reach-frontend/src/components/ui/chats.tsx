"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Check,CheckCheck} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchChannels, channels } from "@/utils/getAllchannels";
import {updateMessageStatus} from '@/utils/setMessageSeen'
import getTime from "@/lib/getTime";
import ChatWindow from "@/components/ui/chatWindow";
import { useSelector } from "react-redux";
import { userState } from "@/lib/redux/featuresSlice/userDetails";
import { Users } from "lucide-react";
import Chatloader from "./chatloader";
import ChatHeader from "./ChatHeader";
import { getAllMessages,group_message } from "@/utils/getGroupMessage";
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'], // regular + semi-bold for messages
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400'], // regular weight for timestamps
})


export default function Chat({ prop }: { prop: { data: channels[] } }) {
  const user = useSelector(userState);
 
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [userMessage, setUserMessage] = useState<{ message: string |null}>({
    message:null,
  });
  const [room, setRoom] = useState<channels>();
  const wsRef = useRef<WebSocket | null>(null);
  const [isSent, Send] = useState<boolean>(false);
  const [usermessages, setMessages] = useState<group_message[]>([]);
  console.log(room)
  useEffect(() => {
    // Scroll to the last message whenever messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [usermessages]);

  interface message {
    message?: string | null;
    userId?: number | undefined;
    chatType?: string;
    roomId?: number;
    timeStamp?: string;
    join?: boolean;
  }

  //  const Message={
  //       message:"",
  //       userId:undefined,
  //       chatType:prop.data.chatType,
  //       projectId:prop.data.projectId,
  //       timeStamp:getTime(),
  //       isSubcribed:false

  //  }

  function sendMessage(userMessage: message) {
    try {
      console.log(userMessage);
      wsRef.current?.send(JSON.stringify(userMessage));
      
      if (wsRef.current?.readyState === WebSocket.OPEN) {
      } else {
        console.warn("WebSocket is not open. Cannot send message.");
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  }

  function sendUserMessage() {
    if (!userMessage.message) return;
    const updatedMessage = {
      message: userMessage.message,
      userId: user.userId!,
      type: room?.chatType,
      roomId: room?.projectId,
      timeStamp: getTime(),
      join: true,
    };
    sendMessage(updatedMessage);
    setUserMessage({message:null})
    const updatedMessageV1={
      message: userMessage?.message,
      userId: user?.userId! as number,
      username:user?.username as string,
      timeStamp: getTime() as string,
      phoneNumber:"",
      picture:user?.picture as string,
      filelink:"",
      isDelevered:false,
      isMessageSeen:false,

    }
    setMessages((prive) => {
      return [...(prive as group_message[]), updatedMessageV1];
    });
  }
  
  useEffect(() => {
    if (!wsRef.current) {

      wsRef.current = new WebSocket(`${process.env.NEXT_PUBLIC_WS_SERVER}`);
      
      wsRef.current.onopen = () => {

        
        console.log("WebSocket opened");
      };
      
      wsRef.current.onmessage = (event) => {
        console.log("Message:", event.data);
      };
    }
    
    if (!room) return;
     if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          message: null,
          userId: user.userId,
          type: room?.chatType,

          roomId: room?.projectId,
          timeStamp: getTime(),
          join: true,
        })
      );

      
    }
    async function  update(){
      try{
      
        const messages= await getAllMessages(room?.projectId!)
        setMessages(messages)
        console.log(messages)
        const response=await updateMessageStatus(room?.projectId!)
        console.log(response)

      }
      catch(error:any){
        console.log(error?.message)
      }

    }  
    update()

   
    return () => {
      // wsRef.current?.close();
      // wsRef.current = null;
      setMessages([]);
    };
  }, [room]);

  return (
    <div className=" min-h-screen w-full flex font-serif bg-green-950/35 ">
      {/* Sidebar */}
      <div className=" w-xl border-r sticky top-0 max-h-screen  border-r-black/10  flex flex-col">
        {/* Sticky Filters and Search */}
        <div className="  relative   bg-white z-10 ">
          {/* <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="p-3"
          >
            <TabsList className="grid grid-cols-4 gap-1">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="favourites">Favs</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
          </Tabs> */}
          <div className=" p-2 max-h-18 ">
            <Input
              className="border-r border-black/12  "
              placeholder="Search or start new chat"
            />
          </div>
        </div>

        {/* Scrollable Chat List */}
        <ScrollArea className=" flex-1 bg-[#E8E8E8] pt-1  flex flex-col gap-1.5 overflow-y-auto ">
          {prop?.data.length > 0 ? (
            prop.data?.map((chat: channels, idx: number) => {
              return (
                <div
                  key={idx}
                  onClick={() => setRoom(chat)}
                  className=" p-4 relative group border-b border-b-slate-800/12 flex flex-col bg-slate-200  transition  cursor-pointer"
                >
                  <div className="absolute group-hover:bg-slate-800/5 inset-0 pointer-events-none  p-3 "></div>
                  <div className="flex justify-start gap-1.5 items-center">
                  <div className="flex justify-start gap-1 items-center">
                    <div className="w-fit bg-white rounded-full">
                      <Users className=" w-10 h-10 p-1 rounded-full text-gray-600" />
                    </div>
                
                  </div>
                <div className="flex justify-between flex-1">
                  <div className="flex flex-col">
                    <h4 className="font-medium self-baseline text-black/80 truncate w-25">
                      {chat.projectName}
                    </h4>
                <p className="text-sm text-start ml-auto text-black/80 truncate w-40">{chat.lastMessage}</p>

                  </div>
                <div className="flex flex-col w-fit items-center ml-auto mt-1">
                <span className={` ${robotoMono.className} text-xs text-end text-gray-500 ` }>{chat.timeStamp}</span>
                {chat.unseenMessageCount > 0 && (
                  <div className="bg-green-600 text-white rounded-full px-2 text-xs">
                  {chat.unseenMessageCount}
                  </div>
                  )}
                </div> 
                </div>
                </div>   

                </div>
              );
            })
          ) : (
            <Chatloader prop={{ count: 8 }} />
          )}
        </ScrollArea>
      </div>

      {/* Right panel (messages) */}
      <div className=" flex-1  flex flex-col relative max-h-[calc(100vh-22vh)]  z-[39]    text-gray-600">
        <ChatHeader prop={{ projectName: room?.projectName! }} />
        {/* <p className="text-lg">Select a chat to start messaging</p>

<p className="text-lg">Select a chat to start messaging</p> */}
        <div className=" w-full flex-1 flex flex-col  p-1.5 relative h-auto top-16 overflow-y-scroll !important custom-scrollbar ">
          <div className=" w-full h-auto flex relative   flex-col gap-1.5  p-1 ">
            {usermessages &&
              usermessages.map((each:group_message, index) => {
                return (
                  <div
                    className={`relative flex  w-full  h-auto   ${
                      each.userId ==user.userId as number
                        ? " chat chat-end justify-end right-8 "
                        : "justify-start  "
                    } `}
                    key={index}
                  >
                      <div className={` chat ${
                      each.userId == user.userId
                        ? " chat chat-end justify-end right-8 "
                        : "justify-start chat-start left-8 "
                    } 
                  
                         `}>
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt={each.username}
                              src={each?.picture as string}
                            />
                          </div>
                        </div>
                        <div className="chat-bubble  bg-slate-200  p-0.5 chat-scrollBar    shadow-2xs     gap-0.5 min-w-[200px] max-w-xl h-auto   ">
                          <div className="absolute text-indigo-950/75 text-[12px] truncate-1 w-[200px] top-0 left-0 p-1 pl-1.5 ">{each.username}</div>
                          <div  className=" chat-scrollBar flex items-center overflow-x-auto">
                            <p className={` ${inter.className}  text-black px-4 py-1 pt-4 `}>
                              {each?.message as string}
                            </p>
                          </div>
                          <div className=" w-fit  sticky inset-0  ml-auto flex gap-0.5 items-center text-[11px] px-1 ">
                            <span className={` ${robotoMono.className} font-semibold text-black/80 font-sans p-1  `}>
                              {each.timeStamp}
                            </span>
                           {each.isMessageSeen || each.isDelevered ? (
                            
                        each.isMessageSeen ? <CheckCheck className="w-4 h-4 text-blue-600" /> : each.isDelevered ? <Check className="w-4 h-4 text-gray-400" />:<></> 
                        ):<></> }  
                          </div>
                        </div>
                      </div>

                      <div ref={lastMessageRef} />
                    </div>
          
                );
              })}
          </div>
        </div>
          <ChatWindow
            prop={{
              setUserMessage: setUserMessage,
              sendUserMessage: sendUserMessage,
            }}
          />
      </div>
    </div>
  );
}
