import axios from "axios";

const token = localStorage.getItem("userToken");

const axiosInstance = axios.create({
  baseURL: "http://172.16.0.19:8000/api/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

export default axiosInstance;
