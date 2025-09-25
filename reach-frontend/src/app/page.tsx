import Image from "next/image";
import {Saira} from 'next/font/google';
import FeatureSEction from "@/components/ui/featureSection";
import Header from '@/components/ui/header';
const saria = Saira({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-saira',
});

export default function Home() {
  return (
   <div className="flex flex-col justify-center relative min-h-screen  caret-transparent bg-gray-100 ">
     <Header 
      prop={{ hide: false }}
     />
    <div className="flex flex-col relative top-16 sm:top-1/4 space-y-4 min-h-90  items-center justify-center  p-8 text-3xl gap-3 md:text-4xl lg:text-5xl ">
             <h1 className={`${saria.className} text-black/70 text-2xl sm:text-3xl lg:text-4xl font-semibold `}>Your Smart Workspace for Feedback,</h1>
          <h1 className={`${saria.className} text-violet-500 text-2xl sm:text-3xl lg:text-4xl font-stretch-semi-condensed `}>Task Management, and Real-Time Notifications</h1>
    <div className="w-full  flex items-center justify-center mt-4">
      <button type="button" className=" px-3 py-1.5 h-12 w-100px hover:bg-transparent font-medium rounded-full border-[1px] border-gray-500/15 ring-blue-400/25 ring-4 hover:border-[2px] transition-[border] ease-in-out bg-gradient-to-r from-gray-300/75 via-cyan-50 to-violet-300/75 hover:to-transparent text-slate-700 text-lg sm:text-xl">Let's get Started</button>
    </div>
      
    </div>

    <FeatureSEction/>

   </div>
  );
}
