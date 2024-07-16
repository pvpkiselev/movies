import axios from 'axios';
import { API_URL } from './constants';
import Cookies from 'js-cookie';

const createMoviesRequest = () => {
  const authToken = Cookies.get('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  return axios.create({
    baseURL: API_URL,
    headers,
  });
};

const MOVIES_REQUEST = createMoviesRequest();

export default MOVIES_REQUEST;
