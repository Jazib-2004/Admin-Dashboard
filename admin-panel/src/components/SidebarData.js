import React from "react";
// react-icons for sidebar
import { BiSolidDashboard } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { MdAnalytics } from "react-icons/md";
import {HiUserGroup} from 'react-icons/hi'

// sidebar data 
export const SidebarData = [
  {
    title: "Dashboard",
    icon: <BiSolidDashboard />,
    link: "/",
  },
  {
    title: "Users",
    icon: <FaUserAlt />,
    link: "/users",
  },
  {
    title: "Mailbox",
    icon: <GrMail />,
    link: "/mailbox",
  },
  {
    title: "Analytics",
    icon: <MdAnalytics />,
    link: "/analytics",
  },
  {
    title: "Friends",
    icon: <HiUserGroup />,
    link: "/friends",
  },
];
