import { GenreResponse } from '@/types/filters/genres.types';
import { resources } from '../resources';
import { ApiRequest, apiRequest } from '../axiosConfig';

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
