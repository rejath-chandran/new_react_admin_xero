import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const MainLayout: React.FC = () => {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <header>{/* Add header content */}</header>
      <nav>{/* Add navigation based on user role */}</nav>
      <main>
        <Outlet />
      </main>
      <footer>{/* Add footer content */}</footer>
    </div>
  );
};

export default MainLayout;
