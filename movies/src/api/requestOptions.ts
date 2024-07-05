import axios from 'axios';
import { API_URL, TOKEN } from './constants';

export const MOVIES_REQUEST = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});
