import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const secretKey=process.env.secret_key

async function  getTokenInfo(){
    try {
        const cookieStore = await cookies();
    
        const token = cookieStore.get('token')?.value!;
        return token
}
catch(error:any){
   
}
   
}

export default getTokenInfo