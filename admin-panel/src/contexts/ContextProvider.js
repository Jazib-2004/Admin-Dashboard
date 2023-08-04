import React, { useContext, useState } from "react";

export const StateContext = React.createContext({
  activeMenu: true,
  themeColor: '#04797d'
});

const ContextProvider = (props) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const themeColor = '#04797d';
  return (
    <StateContext.Provider
      value={{ activeMenu, setActiveMenu , screenSize, setScreenSize, themeColor}}
    >{props.children}</StateContext.Provider>
  );
};

export default ContextProvider;
export const useStateContext = () => useContext(StateContext);
