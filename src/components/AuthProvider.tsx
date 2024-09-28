import { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/axiosConfig";
import { useQuery } from "@tanstack/react-query";

type AuthContext = {
  authToken: string | null;
  currentUser: string | null | undefined;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
};
const AuthContext = createContext<AuthContext | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await api.get("/validate/");
        const { role } = response.data;
        setCurrentUser(role);
      } catch (error) {
        setCurrentUser(null);
      }
    };
    if (window.location.pathname !== "/login") {
      validateToken();
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post("/token/", { email, password });
      const { role } = response.data;
      setCurrentUser(role);
    } catch (error: any) {
      setCurrentUser(null);
      throw error.response.data;
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout/");
      setCurrentUser(null);
    } catch (error) {
      throw new Error("Failed to logout");
    }
  };

  return (
    <AuthContext.Provider
      value={{ authToken, currentUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
