import { resources } from '../resources';
import { Config, fetchData } from '../axiosConfig';
import { MoviesResponse } from '@/components/movieList/types/movies.types';

const getSearchedMovies = async (
  searchQuery: string,
  currentPage: number
): Promise<MoviesResponse> => {
  const { search, movie } = resources;
  const url = `${search}/${movie}`;
  const params = {
    query: searchQuery,
    include_adult: false,
    language: 'en',
    page: currentPage,
  };

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  return fetchData<MoviesResponse>(config);
};

export default getSearchedMovies;
