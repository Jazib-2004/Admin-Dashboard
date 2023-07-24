import React from "react";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
