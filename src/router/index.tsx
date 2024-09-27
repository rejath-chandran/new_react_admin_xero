import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import MainLayout from "../layouts/MainLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import Dashboard from "../components/Dashboard";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import { Example } from "../components/SideBar";
const router = createBrowserRouter([
  {
    path: "/example",
    element: <Example />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "superadmin",
        element: <SuperAdminLayout />,
        children: [
          {
            path: "dashboard",
            element: <SuperAdminDashboard />,
          },
        ],
      },
    ],
  },
]);

export default router;
