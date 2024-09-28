import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

type ProtectedRoutesProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoutes = ({ children, allowedRoles }: ProtectedRoutesProps) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  if (
    currentUser === null ||
    (allowedRoles && !allowedRoles?.includes(currentUser))
  ) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
