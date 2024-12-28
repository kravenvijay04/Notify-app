import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACK_END, // Make sure Base_URL is set correctly in constant.js
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
