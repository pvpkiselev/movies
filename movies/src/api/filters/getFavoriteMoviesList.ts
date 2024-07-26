import { MoviesResponse } from '@/components/movieList/types/movies.types';
import { Config, fetchData } from '../axiosConfig';
import { resources } from '../resources';

const getFavoriteMoviesList = async (
  userId: string,
  currentPage?: number
): Promise<MoviesResponse> => {
  const { account, favorite, movies } = resources;
  const url = `${account}/${userId}/${favorite}/${movies}`;
  const params = { language: 'en', page: currentPage };

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  return fetchData<MoviesResponse>(config);
};

export default getFavoriteMoviesList;
