import { ResponseError } from '@/errors/responseError';
import axiosInstance from './axiosConfig';
import { HttpStatusCode } from 'axios';
import { MoviesResponse } from '@/types/movies/movies.types';

const getSearchMovie = async (
  query: string,
  page: number,
  signal: AbortSignal
): Promise<MoviesResponse> => {
  try {
    const searchEndpoint = import.meta.env.VITE_SEARCH_MOVIE_ENDPOINT.replace(
      '{query}',
      query
    ).replace('{page}', page);

    const response = await axiosInstance.get(searchEndpoint, { signal });

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching genres data');
    }
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    throw error;
  }
};

export default getSearchMovie;
