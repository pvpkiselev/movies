import { ResponseError } from '@/errors/responseError';
import { MovieDetailsType } from '@/types/movies/movieDetails.types';
import axiosInstance from './axiosConfig';

const getMovieDetails = async (id: string): Promise<MovieDetailsType> => {
  try {
    const detailsEndpoint = `/movie/${id}?language=en-US`;

    const response = await axiosInstance.get(detailsEndpoint);

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
