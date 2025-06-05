import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "https://wheelzloop-v3-1.onrender.com", // "http://localhost:5000",
//   withCredentials: true,
// });

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  // timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
      error.isServerDown = true; // Add custom flag
    }
    return Promise.reject(error);
  }
);
