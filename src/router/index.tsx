import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../components/Login";
import ProtectedRoutes from "../components/ProtectedRoutes";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import StaffDashboard from "../components/StaffDashboard";
import { Staff, Attack, Service } from "../pages/superadmin";
import { Dashboard } from "../pages/staff";
import ChangePass from "../pages/superadmin/ChangePaas";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/user",
    element: (
      <ProtectedRoutes allowedRoles={["staff"]}>
        <StaffDashboard />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="/user/dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes allowedRoles={["superadmin"]}>
        <SuperAdminLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="/admin/services" />,
      },
      {
        path: "services",
        element: <Service />,
      },
      {
        path: "staff",
        element: <Staff />,
      },
      {
        path: "attacks",
        element: <Attack />,
      },
      {
        path: "projects",
        element: <>not completed</>,
      },
      {
        path: "changepassword",
        element: <ChangePass/>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
