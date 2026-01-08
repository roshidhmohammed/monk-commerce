import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  headers: {'x-api-key': `${import.meta.env.VITE_API_KEY}`}
})