import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("admin@xerolok.com");
  const [password, setPassword] = useState("superuser@xerolok");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleLoginfrm = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      let role: any = await handleLogin(username, password);
      setLoading(false);

      if (role === "superadmin") {
        console.log("superadmin", role);
        navigate("/admin/services");
      } else if (role === "staff") {
        console.log("staff", role);
        navigate("/user");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.error, {
        position: "bottom-center",
        duration: 3000,
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };
  let role = localStorage.getItem("auth");

  if (role) {
    if (role === "superadmin") {
      //   navigate("/admin/services");
      return <Navigate to="/admin/services" />;
    } else if (role === "staff") {
      //   navigate("/user");
      return <Navigate to="/user" />;
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <Toaster />
      <form
        className="bg-white max-w-[45vw] min-w-[450px] dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800"
        onSubmit={handleLoginfrm}
      >
        <div className="px-8 py-10 md:px-10">
          <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            Xerolok
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            sign in to continue.
          </p>
          <div className="mt-10">
            <div className="relative">
              <label
                className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                // for="email"
              >
                Email
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="you@example.com"
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                name="email"
                id="email"
                type="email"
              />
            </div>
            <div className="mt-6">
              <label
                className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                // for="password"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="••••••••"
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                name="password"
                id="password"
                type="password"
              />
            </div>
            <div className="mt-10">
              {loading ? (
                <Button
                  className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
                  type="submit"
                  disabled
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
                  type="submit"
                >
                  Let's Go
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
          <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
            Forgot your password?
            <Link to={"/reset-password"} className="font-medium underline">
              reset password
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
