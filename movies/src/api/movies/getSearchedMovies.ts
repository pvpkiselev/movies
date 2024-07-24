import { resources } from '../resources';
import { ApiRequest, apiRequest } from '../axiosConfig';
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

  const requestConfig: ApiRequest = {
    method: 'GET',
    url,
    params,
  };

  return apiRequest<MoviesResponse>(requestConfig);
};

export default getSearchedMovies;
