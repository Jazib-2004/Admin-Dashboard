import React, { useEffect } from "react";
import { AiOutlineMenu, AiOutlineMail } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";

import { useStateContext } from "../contexts/ContextProvider";
const NavButton = ({ customFunc, icon, color, dotColor }) => (
  <div>
    <button
      type="button"
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      onClick={customFunc}
      style={{ color }}
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
        {icon}

    </button>
  </div>
);

const Navbar = () => {
  const { setActiveMenu, screenSize, setScreenSize , themeColor} =
    useStateContext();
  const ActiveMenuChangeHandler = () => {
    setActiveMenu((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    const handleScreenResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();

    return()=>{window.removeEventListener('resize',handleScreenResize)}
  },[setScreenSize]);

  useEffect(()=>{
    if (screenSize <= 900){
      setActiveMenu(false)
    }
    else {
      setActiveMenu(true)
    }

  }, [screenSize, setActiveMenu])
  return (
    <div className="flex justify-between p-2 relative md:mx-2">
      <NavButton
        customFunc={ActiveMenuChangeHandler}
        icon={<AiOutlineMenu />}
        color={themeColor}
      />
      <div className="flex">
        <NavButton
          customFunc={() => {}}
          color={themeColor}
          icon={<AiOutlineMail />}
          dotColor="#c73a3a"
        />
        <NavButton
          customFunc={() => {}}
          color={themeColor}
          icon={<RiNotification3Line />}
          dotColor="#c73a3a"
        />
      </div>
    </div>
  );
};

export default Navbar;
