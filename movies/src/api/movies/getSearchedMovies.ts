import { ResponseError } from '@/errors/responseError';
import { HttpStatusCode } from 'axios';
import { MoviesResponse } from '@/types/movies/movies.types';
import { resources } from '../resources';
import { axiosGetInstance } from '../axiosConfig';

const getSearchedMovies = async (query: string, page: number): Promise<MoviesResponse> => {
  try {
    const { search, movie } = resources;
    const resource = `${search}/${movie}`;

    const config = {
      url: resource,
      params: {
        query: query,
        include_adult: false,
        language: 'en',
        page: page,
      },
    };

    const response = await axiosGetInstance(config);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching Searched Movies');
    }
  } catch (error) {
    console.error('Failed to fetch Searched Movies:', error);
    throw error;
  }
};

export default getSearchedMovies;
