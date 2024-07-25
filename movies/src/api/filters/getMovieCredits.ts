import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { MovieCreditsType } from '@/components/moviePageInfo/types/movieCredits.types';

const getMovieCredits = async (id: string): Promise<MovieCreditsType> => {
  const { movie, credits } = resources;
  const url = `${movie}/${id}/${credits}`;
  const params = { language: 'en' };

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  const response = await axiosInstance(config);
  return response.data;
};

export default getMovieCredits;
