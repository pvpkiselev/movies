import { ResponseError } from '@/errors/responseError';
import { MovieCreditsType } from '@/types/movies/movieCredits.types';
import axiosInstance from './axiosConfig';

const getMovieCredits = async (id: string): Promise<MovieCreditsType> => {
  try {
    const detailsEndpoint = `/movie/${id}/credits?language=en-US`;

    const response = await axiosInstance.get(detailsEndpoint);

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
