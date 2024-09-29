import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/SideBar";
const SuperAdminLayout: React.FC = () => {
  return (
    <div className="flex bg-indigo-50">
      <Sidebar />
      <div className="h-[100vh] w-full overflow-hidden scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminLayout;
