import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://jobportal-tfy8.onrender.com/v1/api",
    withCredentials: true
});