import { resources } from '../resources';
import { Config, fetchData } from '../axiosConfig';
import { GenreResponse } from '@/components/filters/genres/types/genres.types';

const getGenresData = async (): Promise<GenreResponse> => {
  const { genre, movie, list } = resources;
  const url = `${genre}/${movie}/${list}`;
  const params = { language: 'en' };

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  return fetchData<GenreResponse>(config);
};

export default getGenresData;
