import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useStateContext } from "./contexts/ContextProvider";
import AppRoutes from "./AppRoutes/AppRoutes";
const App = () => {
  const { activeMenu } = useStateContext();
  return (
    <BrowserRouter>
      {/* Main App */}
      <div className="flex relative dark:bg-black-dark-bg">
        {/* Sidebar */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar bg-white dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        {/* Navbar*/}
        <div
          className={`bg-main-bg dark:bg-main-dark-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          <div className="fixed bg-main-bg dark:bg-main-dark-bg w-full navbar md:static">
            <Navbar />
          </div>
          {/* App Routes */}
          <AppRoutes/>
          
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

