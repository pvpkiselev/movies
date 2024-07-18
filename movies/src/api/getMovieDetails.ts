import { ResponseError } from '@/errors/responseError';
import { MovieDetailsType } from '@/types/movies/movieDetails.types';
import axiosInstance from './axiosConfig';
import { HttpStatusCode } from 'axios';

const getMovieDetails = async (id: string): Promise<MovieDetailsType> => {
  try {
    const detailsEndpoint = import.meta.env.VITE_MOVIE_DETAILS_ENDPOINT.replace('{movie_id}', id);

    const response = await axiosInstance.get(detailsEndpoint);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching movies details data');
    }
  } catch (error) {
    console.error(`Failed to fetch movies details:`, error);
    throw error;
  }
};

export default getMovieDetails;
