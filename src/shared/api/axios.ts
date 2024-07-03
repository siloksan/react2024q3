import axios from 'axios';

const baseURL = import.meta.env.VITE_CTP_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 7777,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default axiosInstance;
