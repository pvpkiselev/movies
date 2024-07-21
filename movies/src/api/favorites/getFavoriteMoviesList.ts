import { ResponseError } from '@/errors/responseError';
import { axiosGetInstance } from '../axiosConfig';
import { MoviesResponse } from '@/types/movies/movies.types';
import { HttpStatusCode } from 'axios';
import { resources } from '../resources';

interface FavoriteMoviesParams {
  language: string;
  page?: number;
}

const getFavoriteMoviesList = async (
  userId: string,
  currentPage?: number
): Promise<MoviesResponse> => {
  try {
    const { account, favorite, movies } = resources;
    const resource = `${account}/${userId}/${favorite}/${movies}`;

    const params: FavoriteMoviesParams = {
      language: 'en',
    };

    if (currentPage) {
      params.page = currentPage;
    }

    const config = {
      url: resource,
      params: params,
    };

    const response = await axiosGetInstance(config);

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
