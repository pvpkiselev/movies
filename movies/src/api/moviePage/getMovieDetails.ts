import { resources } from '../resources';
import { ApiRequest, apiRequest } from '../axiosConfig';
import { MovieDetailsType } from '@/components/moviePageInfo/types/movieDetails.types';

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
