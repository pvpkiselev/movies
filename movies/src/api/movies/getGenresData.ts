import { resources } from '../resources';
import { ApiRequest, apiRequest } from '../axiosConfig';
import { GenreResponse } from '@/components/filters/genres/types/genres.types';

const getGenresData = async (): Promise<GenreResponse> => {
  const { genre, movie, list } = resources;
  const url = `${genre}/${movie}/${list}`;
  const params = { language: 'en' };

  const requestConfig: ApiRequest = {
    method: 'GET',
    url,
    params,
  };

  return apiRequest<GenreResponse>(requestConfig);
};

export default getGenresData;
