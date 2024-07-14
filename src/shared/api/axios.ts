import axios from 'axios';
import { baseUrl } from './const';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 7777,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default axiosInstance;
