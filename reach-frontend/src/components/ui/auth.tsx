'use client'
import React from 'react'
import {useDispatch} from 'react-redux'
import {getDetails} from '@/lib/redux/featuresSlice/userDetails'
import type { AppDispatch } from '@/lib/redux/store'
import {useEffect} from 'react'
export default function Auth({children}:{children:React.ReactNode}) {
    const dispatch=useDispatch<AppDispatch>()
    useEffect(()=>{
     dispatch(getDetails())

    },[dispatch])
  return (
    <div className=' w-full relative bg-white min-h-screen h-full '>
        {children}
    </div>
  )
}
