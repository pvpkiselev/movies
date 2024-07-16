import { ResponseError } from '@/errors/responseError';
import MOVIES_REQUEST from './requestOptions';

const topRatedEndpoint = '/movie/top_rated?language=en-US&page=';

const getTopRatedMovies = async (page: number = 1, signal: AbortSignal) => {
  try {
    const response = await MOVIES_REQUEST.get(`${topRatedEndpoint}${page}`, { signal });
    const okResponseCode = 200;

    if (response.status !== okResponseCode) {
      throw new ResponseError('Error fetching top rated movies data');
    }

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch top rated movies:`, error);
    throw error;
  }
};

export default getTopRatedMovies;
