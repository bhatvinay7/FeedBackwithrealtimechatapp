'use client'
import React from 'react'
import DashboardHeader from '@/components/ui/dashboardHeader';

// import React from 'react'
import Sidebar from '@/components/ui/sideBar';
// import DashboardHeader from '@/components/ui/dashboardHeader';
// export default function Page() {
//   return (
//     <div className='w-full min-h-screen relative  flex flex-col'>


//     </div>
//   )
// }
export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className='w-full  min-h-screen h-full bg-white flex flex-col'>
               <div className='flex min-h-screen w-full'>
                   <Sidebar />
                   <main className=' flex-1 justify-center bg-white  min-h-screen relative  h-full items-center flex-col '>
                      <DashboardHeader />
                            <div className='flex-1 min-h-screen bg-indigo-50 h-full  relative top-16 '>
                             {children}

                            </div>
                   </main>
               </div>
       
    </div>
  )
}
