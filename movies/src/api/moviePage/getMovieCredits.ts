import { ResponseError } from '@/errors/responseError';
import { MovieCreditsType } from '@/types/movies/movieCredits.types';
import axiosInstance from '../axiosConfig';
import { HttpStatusCode } from 'axios';

const getMovieCredits = async (id: string): Promise<MovieCreditsType> => {
  try {
    const creditsEndpoint = import.meta.env.VITE_MOVIE_CREDITS_ENDPOINT.replace('{movie_id}', id);

    const response = await axiosInstance.get(creditsEndpoint);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching movies credits data');
    }
  } catch (error) {
    console.error(`Failed to fetch movies credits:`, error);
    throw error;
  }
};

export default getMovieCredits;
