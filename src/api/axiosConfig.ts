import axios from "axios";

const api = axios.create({
  baseURL: "https://api.xerolok.com/api",
  withCredentials: true,
});

export default api;
