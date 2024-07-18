import { ResponseError } from '@/errors/responseError';
import axiosInstance from './axiosConfig';
import { MoviesResponse } from '@/types/movies/movies.types';
import { HttpStatusCode } from 'axios';

const getPopularMovies = async (page: number = 1, signal: AbortSignal): Promise<MoviesResponse> => {
  try {
    const popularEndpoint = import.meta.env.VITE_POPULAR_ENDPOINT.replace('{page}', page);

    const response = await axiosInstance.get(popularEndpoint, { signal });

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching popular movies data');
    }
  } catch (error) {
    console.error('Failed to fetch popular movies:', error);
    throw error;
  }
};

export default getPopularMovies;
