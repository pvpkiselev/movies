import { ResponseError } from '@/errors/responseError';
import axiosInstance from './axiosConfig';

const popularEndpoint = '/movie/popular?language=en-US&page=';

const getPopularMovies = async (page: number = 1, signal: AbortSignal) => {
  try {
    const response = await axiosInstance.get(`${popularEndpoint}${page}`, { signal });
    const okResponseCode = 200;

    if (response.status !== okResponseCode) {
      throw new ResponseError('Error fetching popular movies data');
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch popular movies:', error);
    throw error;
  }
};

export default getPopularMovies;
