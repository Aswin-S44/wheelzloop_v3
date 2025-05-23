import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://wheelzloop-v3-1.onrender.com", //  "http://localhost:5000",
  withCredentials: true,
});
