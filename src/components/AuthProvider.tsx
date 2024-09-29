import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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

  useLayoutEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === 401 &&
          !originalRequest._retry &&
          error.response.data.code === "token_not_valid"
        ) {
          originalRequest._retry = true;
          try {
            const refreshResponse = await api.post("/refresh/");
            if (refreshResponse.status === 200) {
              localStorage.setItem("auth", refreshResponse.data.role);
              return api(originalRequest);
            }
          } catch (refreshError) {
            //   setCurrentUser(null);
            localStorage.removeItem("auth");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }, []);

  useQuery({
    queryKey: ["validateToken"],
    retryOnMount: false,
    queryFn: async () => {
      const response = await api.get("/validate/");
      return response.data;
    },
    onError: () => {
      // alert("token expired2");
      localStorage.removeItem("auth");
      setCurrentUser(null);
    },
    onSuccess: (data) => {
      setCurrentUser(data.role);
    },
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post("/token/", { email, password });
      const { role } = response.data;
      setCurrentUser(role);
      localStorage.setItem("auth", role);
      return role;
    } catch (error: any) {
      setCurrentUser(null);
      throw error.response.data;
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout/");
      localStorage.removeItem("auth");
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
