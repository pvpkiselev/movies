import axios from 'axios';
import { API_URL } from './constants';

const axiosGetInstance = axios.create({
  baseURL: API_URL,
  method: 'get',
  headers: {
    accept: 'application/json',
  },
});

const axiosPostInstance = axios.create({
  baseURL: API_URL,
  method: 'post',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setAxiosAuthToken = (token: string | null) => {
  if (token) {
    axiosGetInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axiosPostInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosGetInstance.defaults.headers.common['Authorization'];
    delete axiosPostInstance.defaults.headers.common['Authorization'];
  }
};

export { axiosGetInstance, axiosPostInstance };
