import axios from 'axios';
import { API_URL } from './constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const setAxiosAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
