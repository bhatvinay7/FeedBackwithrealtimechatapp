import React from 'react'


import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
export default function NotificatinUi({prop}:{prop:{message:String,show:boolean,setShow:()=>void}}) {
   
 
  // useEffect(() => {
  return (
    <AnimatePresence>
      {prop.show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-5 left-1/2  z-50"
        >
          <div className="flex items-center justify-between gap-2 z-[42] bg-green-50 font-serif border border-green-300/45 text-green-800 px-4 py-3 shadow-md min-w-[280px] h-[3.5rem]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-700 " />
              <span className="text-sm font-medium">{prop.message}</span>
            </div>
            <button type="button" aria-label="Close" onClick={() => prop.setShow()} className="text-green-600 hover:text-green-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
