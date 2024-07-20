import { ResponseError } from '@/errors/responseError';
import { MovieDetailsType } from '@/types/movies/movieDetails.types';
import { HttpStatusCode } from 'axios';
import { resources } from '../resources';
import { axiosGetInstance } from '../axiosConfig';

const getMovieDetails = async (id: string): Promise<MovieDetailsType> => {
  try {
    const { movie } = resources;
    const resource = `${movie}/${id}`;

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
      throw new ResponseError('Error fetching movies details data');
    }
  } catch (error) {
    console.error(`Failed to fetch movies details:`, error);
    throw error;
  }
};

export default getMovieDetails;
