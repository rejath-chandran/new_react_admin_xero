import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post("/api/refresh");
        if (refreshResponse.status === 200) {
          // Assuming the new access token is set in the cookie by the server
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token is invalid, redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
