import getTokenInfo from "@/lib/getUserTokenInfo";
import { NextResponse,NextRequest } from 'next/server';
import jwt from 'jsonwebtoken'
interface CustomJwtPayload{
    username:string,
    id:number,
    picture:string,
    emailId:string,
    role:string
}
export async function GET(req:NextRequest){
   try{
        const token= await getTokenInfo()
        const decoded = jwt.verify(token!, process.env.secret_key!) as CustomJwtPayload

        return NextResponse.json({username:decoded.username ,userId:decoded.id,emailId:decoded.emailId,picture:decoded.picture,role:decoded.role})
        
   }
   catch(error:any){

       return NextResponse.json({message:`${error.message}`},{status:500})

   }
}