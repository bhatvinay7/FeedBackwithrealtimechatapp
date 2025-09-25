"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaProjectDiagram, FaComments, FaUser } from "react-icons/fa";
import { MessageSquare,MessageSquareText } from "lucide-react";
import SideBarToggleComponent from "./sidebarToggleComponent";
import { useSelector } from "react-redux";
import { sideBarState } from "@/lib/redux/featuresSlice/slideBarSlice";
import {
  profileState,
  toggleProfile,
} from "@/lib/redux/featuresSlice/slideBarProfileSlice";
import Profile from "./profile";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const sidebarVisible = useSelector(sideBarState);
  const isProfileOpen = useSelector(profileState);
  const dispatch = useDispatch();

  function callDispatch() {
    console.log(isProfileOpen);
    dispatch(toggleProfile(!isProfileOpen));
  }
  const navLinks = [
    {
      href: "/dashboard",
      icon: <FaPlus aria-label="create project" className="text-gray-700 w-5 h-5" />,
      label: "Create Project",
      click: (link: string) => {
        router.push(link);
      },
    },
    {
      href: "/dashboard/project",
      icon: <FaProjectDiagram aria-label="projects" className="text-gray-700 w-5 h-5" />,
      label: "Projects",
      click: (link: string) => {
        router.push(link);
      },
    },
    {
      href: "/chats",
      icon: <FaComments aria-label="chats" className="text-gray-700 w-5 h-5" />,
      label: "Chats",
      click: (link: string) => {
        router.push(link);
      },
    },
    {
      href: "",
      icon: <FaUser aria-label="profile" className="text-gray-700 w-5 h-5" />,
      label: "Profile",
      click: (link: string) => {
        callDispatch();
      },
    },
    {
      href: "/dashboard/feedback",
      icon: <MessageSquare aria-label="feedback" className="text-gray-700 w-5 h-5" />,
      label: "Feedback",
      click: (link: string) => {
        router.push(link);
      },
    },
{
      href: "/dashboard/project-review",
      icon: <MessageSquareText aria-label="project review" className="text-gray-700 w-5 h-5" />,
      label: "Project Review",
      click: (link: string) => {
        router.push(link);
      },
    },
  ];
  useEffect(() => {
    setOpen(sidebarVisible);
   
  }, [sidebarVisible]);

  return (
    <>
    
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ width: isOpen ? 256 : 80, opacity: 1 }}
      transition={{ duration: isProfileOpen ? 0.1 : 0.3, ease: "easeInOut" }}
      className={` w-full  md:w-fit md:block hidden bg-gray-300 relative border-r border-black/13 inset-0  md:left-0 z-[40] `}
    >
      <motion.h1
        // initial={{ opacity: 0 }}
        // animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={` text-center flex items-center sticky top-0  justify-center text-xl z-[42] h-16 font-bold ${
          isOpen ? "border-b border-b-black/14" : ""
        } " text-gray-700 " `}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen && "Dashboard"}
        </motion.span>
        <div className=" absolute right-0 z-[52]  bottom-5 hidden md:block  ">
        <SideBarToggleComponent />

        </div>
      </motion.h1>

      <motion.aside
        initial={{x:0 ,opacity:0}}
        animate={{ width: isOpen ? 256 : 80 ,opacity:1}}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={` ${sidebarVisible?"w-256":"w-80 "} h-screen w-full md:flex hidden  bg-slate-200 border-r  left-0  fixed border-r-black/13 z-[41] text-gray-700  flex-col p-4 space-y-6 "
        `}>
         <Profile prop={{ isOpen: isProfileOpen, isSideBarOpen: isOpen ,x1Value:256,x2Value:80}} />

        {/* Title

        {/* Navigation */}
        <nav className="flex flex-col space-y-2  ">
          {navLinks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{ delay: index * 0.07 }}
            >
              <div
                onClick={() => item.click(item.href)}
                className={`relative z-[42] flex cursor-pointer justify-start   space-x-3   ${ 
                  !sidebarVisible
                    ? " rounded-full  transition-colors delay-400 w-[45px] h-[45px] p-2  hover:bg-green-200/75 items-center justify-center"
                    : ""
                }    hover:bg-green-200/40 p-2 rounded transition-all duration-300`}
              >
                {item.icon}
                {isOpen && (
                  <span className="font-medium transition-[w] delay-400 text-gray-700 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </nav>
      </motion.aside>
    </motion.div> 




<motion.div

initial={{ x: 0, opacity: 0 }}
animate={{opacity: 1 }}
transition={{ duration: isProfileOpen ? 0.1 : 0.3, ease: "easeInOut" }}
className={` ${isOpen ? "block min-w-full":'w-0'} fixed  md:hidden min-h-screen h-full bg-slate-200 inset-0 top-16    left-0 z-[42] `}
>
      {/* <motion.h1
        // initial={{ opacity: 0 }}
        // animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={` text-center flex items-center sticky top-0  justify-center text-xl z-[42] h-16 font-bold ${
          isOpen ? "border-b border-b-black/14" : ""
        } " text-gray-700 " `}
      >
      <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      >
      {isOpen && "Dashboard"}
      </motion.span>
      
      </motion.h1> */}


      <motion.aside
        initial={{x:0 ,opacity:0}}
        animate={{opacity:1}}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={` ${sidebarVisible ? " w-full visible ":" w-0 invisible "}  min-h-screen flex md:hidden shrink-0 bg-slate-200 border-r  left-0 absolute border-r-black/13 z-[41] text-gray-700  flex-col p-4 space-y-6 "
          `}>

        <div className=" relative left-0 top-0 z-[52]  bottom-5 block md:hidden  ">
          
        <Profile prop={{ isOpen: isProfileOpen, isSideBarOpen: isOpen ,x1Value:0,x2Value:0}} />
          
          </div>    

        {/* Title */}

        {/* Navigation */}
        <nav className="flex flex-col space-y-2  ">
          {navLinks.map((item, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ delay: index * 0.07 }}
            >
              <div
                onClick={() => item.click(item.href)}
                className={`relative z-[42] flex cursor-pointer justify-start   space-x-3   ${ 
                  sidebarVisible
                    ? "  block   w-[45px] h-[45px] p-2   items-center justify-center"
                    : " w-0 hidden"
                }    `}
                >
                {sidebarVisible && (
                  <div className="w-fit gap-x-2 flex items-center justify-center">

                    {item.icon}
                  <span className="font-medium transition-[w] delay-400 text-gray-700 whitespace-nowrap">
                    {item.label}
                  </span>
                    </div>
                )}
              </div>
            </motion.div>
          ))}
        </nav>
      </motion.aside>
    </motion.div>
        

    </>
  );
}
