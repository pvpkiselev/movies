import axios from 'axios';
import { ResponseError } from '../errors/ResponseError';

const API_URL = import.meta.env.VITE_API_URL_GENRES as string;
const TOKEN = import.meta.env.VITE_TOKEN as string;

const MOVIES_REQUEST = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

const getGenresData = async () => {
  try {
    const response = await MOVIES_REQUEST.get('/genre/movie/list?language=ru');

    const okResponseCode = 200;

    if (response.status !== okResponseCode) {
      throw new ResponseError('Error fetching genres data');
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch genres:', error);
  }
};

export default getGenresData;
