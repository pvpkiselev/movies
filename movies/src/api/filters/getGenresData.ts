import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
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

  const response = await axiosInstance(config);
  return response.data;
};

export default getGenresData;
