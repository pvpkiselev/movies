import { ResponseError } from '@/errors/responseError';
import { MOVIES_REQUEST } from './requestOptions';
import { MovieCreditsType } from '@/types/movies/movieCredits.types';

const getMovieCredits = async (id: string): Promise<MovieCreditsType> => {
  try {
    const detailsEndpoint = `/movie/${id}/credits?language=en-US`;

    const response = await MOVIES_REQUEST.get(detailsEndpoint);

    const okResponseCode = 200;

    if (response.status !== okResponseCode) {
      throw new ResponseError('Error fetching movies credits data');
    }

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch movies credits:`, error);
    throw error;
  }
};

export default getMovieCredits;
