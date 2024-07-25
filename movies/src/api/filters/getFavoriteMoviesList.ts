import { MoviesResponse } from '@/components/movieList/types/movies.types';
import { axiosInstance, Config } from '../axiosConfig';
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

  const response = await axiosInstance(config);
  return response.data;
};

export default getFavoriteMoviesList;
