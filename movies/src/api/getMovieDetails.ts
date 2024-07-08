import { ResponseError } from '@/errors/responseError';
import { MOVIES_REQUEST } from './requestOptions';
import { MovieDetailsType } from '@/types/movies/movieDetails.types';

const getMovieDetails = async (id: string): Promise<MovieDetailsType> => {
  try {
    const detailsEndpoint = `/movie/${id}?language=en-US`;

    const response = await MOVIES_REQUEST.get(detailsEndpoint);

    const okResponseCode = 200;

    if (response.status !== okResponseCode) {
      throw new ResponseError('Error fetching movies details data');
    }

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch movies details:`, error);
    throw error;
  }
};

export default getMovieDetails;
