import { MovieCreditsType } from '@/types/movies/movieCredits.types';
import { resources } from '../resources';
import { ApiRequest, apiRequest } from '../axiosConfig';

const getMovieCredits = async (id: string): Promise<MovieCreditsType> => {
  const { movie, credits } = resources;
  const url = `${movie}/${id}/${credits}`;
  const params = { language: 'en' };

  const requestConfig: ApiRequest = {
    method: 'GET',
    url,
    params,
  };

  return apiRequest<MovieCreditsType>(requestConfig);
};

export default getMovieCredits;
