import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const SuperAdminLayout: React.FC = () => {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== "superadmin") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <h1>Super Admin Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default SuperAdminLayout;
