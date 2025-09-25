import axios from 'axios'
import {useDispatch} from 'react-redux'
// import {setUserDetails} from '@/lib/redux/featuresSlice/userDetails'
export interface CustomJwtPayload{
    username:string,
    userId:number,
    picture:string,
    emailId:string,
    role:string,
    state?:string |undefined
}
export  async function getUserDetails():Promise<CustomJwtPayload>{
//    const dispatch=useDispatch()
    const response=await axios.get('/api/userCredentials')
    // dispatch(setUserDetails(response.data as CustomJwtPayload ))
    return response.data as CustomJwtPayload

}