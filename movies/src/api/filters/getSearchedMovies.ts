import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { MoviesResponse } from '@/components/movieList/types/movies.types';

const getSearchedMovies = async (query: string, page: number): Promise<MoviesResponse> => {
  const { search, movie } = resources;
  const url = `${search}/${movie}`;
  const params = {
    query,
    include_adult: false,
    language: 'en',
    page,
  };

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  const response = await axiosInstance(config);
  return response.data;
};

export default getSearchedMovies;
