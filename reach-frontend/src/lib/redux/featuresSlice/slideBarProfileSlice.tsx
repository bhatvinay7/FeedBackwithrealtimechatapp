import {createSlice} from '@reduxjs/toolkit'
import type { RootState}   from '../store'


const initialState:{
    isOpen:boolean
}={
    isOpen:false
}


const profileSlice=createSlice({
name:"profile",
initialState,
reducers:{
      toggleProfile(state,action){
        state.isOpen=action.payload
      }
}


})

export const {toggleProfile}=profileSlice.actions
export const profileState=(state:RootState):boolean=>state.profile.isOpen

export default profileSlice.reducer
