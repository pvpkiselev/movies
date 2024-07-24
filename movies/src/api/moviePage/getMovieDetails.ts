import { MovieDetailsType } from '@/types/movies/movieDetails.types';
import { resources } from '../resources';
import { ApiRequest, apiRequest } from '../axiosConfig';

const getMovieDetails = async (id: string): Promise<MovieDetailsType> => {
  const { movie } = resources;
  const url = `${movie}/${id}`;
  const params = { language: 'en' };

  const requestConfig: ApiRequest = {
    method: 'GET',
    url,
    params,
  };

  return apiRequest<MovieDetailsType>(requestConfig);
};

export default getMovieDetails;
