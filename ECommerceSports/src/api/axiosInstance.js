import axios from "axios";
import { BASE_API_URL } from "./config"

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL
});

export const setAuthToken = () => {
let token = localStorage.getItem('token');
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}





