import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const Api = axios.create({
    baseURL: "http://localhost:3000"
});

Api.interceptors.request.use((config) => {
    const user = getUserLocalStorage();
    console.log()
    console.log(user?.access_token);
    config.headers.Authorization = `Bearer ${user?.access_token}`;
    return config;
}, (error) => Promise.reject(error));