import { ResponseError } from '@/errors/responseError';
import { MOVIES_REQUEST } from './requestOptions';
import { POPULAR_OPTION, TOP_RATED_OPTION } from '@/components/filters/sortSelect/constants';

const popularEndpoint = '/movie/popular?language=en-US&page=';
const topRatedEndpoint = '/movie/top_rated?language=en-US&page=';

const getSortedMovies = async (sortType: string, page: number = 1) => {
  try {
    let endpoint = '';

    switch (sortType) {
      case POPULAR_OPTION:
        endpoint = `${popularEndpoint}${page}`;
        break;
      case TOP_RATED_OPTION:
        endpoint = `${topRatedEndpoint}${page}`;
        break;
      default:
        throw new ResponseError('Invalid sort type');
    }

    const response = await MOVIES_REQUEST.get(endpoint);

    const okResponseCode = 200;

    if (response.status !== okResponseCode) {
      throw new ResponseError('Error fetching movies data');
    }

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${sortType} movies:`, error);
  }
};

export default getSortedMovies;
