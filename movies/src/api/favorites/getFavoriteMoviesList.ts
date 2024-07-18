import { ResponseError } from '@/errors/responseError';
import axiosInstance from '../axiosConfig';
import { MoviesResponse } from '@/types/movies/movies.types';
import { HttpStatusCode } from 'axios';

const getFavoriteMoviesList = async (userId: string, page: number): Promise<MoviesResponse> => {
  try {
    const favoriteMoviesListEndpoint = import.meta.env.VITE_FAVORITE_MOVIES_LIST_ENDPOINT.replace(
      '{userId}',
      userId
    ).replace('{page}', page.toString());

    const response = await axiosInstance.get(favoriteMoviesListEndpoint);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching Favorite Movies List');
    }
  } catch (error) {
    console.error('Failed to fetch Favorite Movies List:', error);
    throw error;
  }
};

export default getFavoriteMoviesList;
