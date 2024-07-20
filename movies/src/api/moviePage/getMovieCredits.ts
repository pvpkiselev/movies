import { ResponseError } from '@/errors/responseError';
import { MovieCreditsType } from '@/types/movies/movieCredits.types';
import { HttpStatusCode } from 'axios';
import { axiosGetInstance } from '../axiosConfig';
import { resources } from '../resources';

const getMovieCredits = async (id: string): Promise<MovieCreditsType> => {
  try {
    const { movie, credits } = resources;
    const resource = `${movie}/${id}/${credits}`;

    const config = {
      url: resource,
      params: {
        language: 'en',
      },
    };

    const response = await axiosGetInstance(config);

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
