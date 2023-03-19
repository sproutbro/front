import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
const restApi = axios.create({ baseURL: baseUrl });

// Axios Interceptor 생성
restApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default restApi;
