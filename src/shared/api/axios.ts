import axios from 'axios';

const baseURL = 'https://stapi.co/api/v2/rest/';

const axiosInstance = axios.create({
  baseURL,
  timeout: 7777,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default axiosInstance;
