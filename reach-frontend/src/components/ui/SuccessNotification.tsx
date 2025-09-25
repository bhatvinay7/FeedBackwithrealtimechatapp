import React from 'react'


import { motion, AnimatePresence } from "framer-motion";
// import { CheckCircle, X } from "lucide-react";
export default function NotificatinUi({prop}:{prop:{message:string |null,show:boolean,setShow:()=>void}}) {
   
 
  // useEffect(() => {
  return (
    <AnimatePresence>
      {prop.show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className=" inse-0  absolute top-16 w-full flex justify-center items-center  z-50"
        >
          <div className="flex max-w-sm items-center h-28 fixed gap-2 z-[42] bg-slate-100  font-serif border border-gray-400 rounded-sm  text-center text-green-600 px-4 py-3 shadow-md min-w-[280px] ">
            <div className="flex items-center gap-2 ">
              {/* <CheckCircle className="w-6 h-6 text-green-700 " /> */}
              <span className="text-base font-medium">{prop.message}</span>
            </div>
            {/* <button type="button" aria-label="Close" onClick={() => prop.setShow()} className="text-green-600 hover:text-green-900">
              <X className="w-4 h-4" />
            </button> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
