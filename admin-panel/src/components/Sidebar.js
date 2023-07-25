import React from "react";
import { Link, NavLink } from "react-router-dom";
import {BsCalendarEvent} from "react-icons/bs";
import { SidebarData } from "./SidebarData";
import { useStateContext } from "../contexts/ContextProvider";
const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, themeColor} =
    useStateContext();
  const handleSmallScreens = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 text-white";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray";
  return (
    <div className="ml-3 h-screen overflow-auto md:overflow-hidden md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          {/* App Icon on the Sidebar */}
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleSmallScreens}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-bold text-slate-900 dark:text-white"
            >
              <BsCalendarEvent />
              <div>Circle</div>
            </Link>
          </div>
          {/* Sidebar Links */}

          <div className="mt-10 ">
            {SidebarData.map((data, index) => (
              <NavLink
                to={data.link}
                key={index}
                onClick={handleSmallScreens}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? themeColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {data.icon}
                <span>{data.title}</span>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
