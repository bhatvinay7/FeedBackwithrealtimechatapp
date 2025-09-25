// 'use client'
// import react from 'react'
import Chats from '@/components/ui/chats'
import {fetchChannels,channels} from '@/utils/getAllchannels'
// import {useState,useEffect} from 'react'
export default async    function ChatPage() {
  
// const [response,setResponse]=useState<channels[]>([])

//   useEffect(()=>{

//     async function fetch(){
//       try{
//         const response=await fetchChannels()
//         console.log(response)
//          setResponse(response)

//       }
//       catch(error:any){

//       }
//     }
//     fetch()
//   },[])

  const response=await fetchChannels()

  return (
    <Chats
     prop={{data:response}}
    />

  )

  
}

