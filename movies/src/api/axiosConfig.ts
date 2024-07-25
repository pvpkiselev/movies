import axios from 'axios';
import { API_URL } from './constants';

export interface Config {
  headers?: Record<string, string>;
  method: 'GET' | 'POST';
  url: string;
  data?: unknown;
  params?: Record<string, unknown>;
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// const apiRequest = async <T>(props: ApiRequest): Promise<T> => {
//   const { headers, method, url, data, params } = props;

//   const config: AxiosRequestConfig = {
//     headers,
//     method,
//     url,
//     params: method === 'GET' ? params : undefined,
//     data: method === 'POST' ? data : undefined,
//   };

//   const response = await axiosInstance(config);
//   return response.data;
// };

const setAxiosAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export { axiosInstance, setAxiosAuthToken };
