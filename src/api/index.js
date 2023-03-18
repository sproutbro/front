import axios from "axios";

const restApi = axios.create({ baseURL: "http://144.24.92.60:8080" });

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
