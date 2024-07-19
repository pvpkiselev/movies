import { ResponseError } from '@/errors/responseError';
import MOVIES_REQUEST from '../axiosConfig';
import { MoviesResponse } from '@/types/movies/movies.types';
import { HttpStatusCode } from 'axios';

const getTopRatedMovies = async (
  page: number = 1,
  signal: AbortSignal
): Promise<MoviesResponse> => {
  try {
    const topRatedEndpoint = import.meta.env.VITE_TOP_RATED_ENDPOINT.replace('{page}', page);

    const response = await MOVIES_REQUEST.get(topRatedEndpoint, { signal });

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching top rated movies data');
    }
  } catch (error) {
    console.error(`Failed to fetch top rated movies:`, error);
    throw error;
  }
};

export default getTopRatedMovies;
