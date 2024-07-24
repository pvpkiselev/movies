import axios, { AxiosRequestConfig, HttpStatusCode } from 'axios';
import { API_URL } from './constants';
import { ResponseError } from '@/errors/responseError';

export interface ApiRequest {
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

const apiRequest = async <T>(props: ApiRequest): Promise<T> => {
  const { headers, method, url, data, params } = props;
  try {
    const config: AxiosRequestConfig = {
      headers,
      method,
      url,
      params: method === 'GET' ? params : undefined,
      data: method === 'POST' ? data : undefined,
    };

    const response = await axiosInstance(config);

    const isSuccessResponse =
      response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.Created;

    if (isSuccessResponse) {
      return response.data;
    } else {
      throw new ResponseError(`Error with status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

const setAxiosAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export { axiosInstance, apiRequest, setAxiosAuthToken };
