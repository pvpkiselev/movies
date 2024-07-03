import axios from 'axios';
import { ResponseError } from '@/errors/responseError';
import { API_URL, TOKEN } from './constants';

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
