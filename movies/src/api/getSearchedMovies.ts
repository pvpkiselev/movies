import { ResponseError } from '@/errors/responseError';
import axiosInstance from './axiosConfig';
import { HttpStatusCode } from 'axios';
import { MoviesResponse } from '@/types/movies/movies.types';

const getSearchedMovies = async (query: string, page: number): Promise<MoviesResponse> => {
  try {
    const searchEndpoint = import.meta.env.VITE_SEARCHED_MOVIES_ENDPOINT.replace(
      '{query}',
      query
    ).replace('{page}', page);

    const response = await axiosInstance.get(searchEndpoint);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching Searched Movies');
    }
  } catch (error) {
    console.error('Failed to fetch Searched Movies:', error);
    throw error;
  }
};

export default getSearchedMovies;
