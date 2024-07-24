import { MoviesResponse } from '@/components/movieList/types/movies.types';
import { ApiRequest, apiRequest } from '../axiosConfig';
import { resources } from '../resources';

const getFavoriteMoviesList = async (
  userId: string,
  currentPage?: number
): Promise<MoviesResponse> => {
  const { account, favorite, movies } = resources;
  const url = `${account}/${userId}/${favorite}/${movies}`;
  const params = { language: 'en', page: currentPage };

  const requestConfig: ApiRequest = {
    method: 'GET',
    url,
    params,
  };

  return apiRequest<MoviesResponse>(requestConfig);
};

export default getFavoriteMoviesList;
