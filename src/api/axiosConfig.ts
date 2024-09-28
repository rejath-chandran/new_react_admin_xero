import axios from "axios";

const api = axios.create({
  baseURL: "https://api.xerolok.com/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("Error- normal", error);

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.code === "token_not_valid"
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.post("/refresh/");
        if (refreshResponse.status === 200) {
          return api(originalRequest);
        }
      } catch (refreshError) {
        window.location.href = "/login";
        console.log("Refresh token is invalid, redirecting to login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
