import axios from "axios";

export const myAPIConfig = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

myAPIConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
