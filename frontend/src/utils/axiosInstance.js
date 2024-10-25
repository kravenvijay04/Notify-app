import { Base_URL } from "./constant";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: Base_URL, // Make sure Base_URL is set correctly in constant.js
    timeout: 10000,
    headers: {
        "Content-Type": "application/json", // Fixed the typo here
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
