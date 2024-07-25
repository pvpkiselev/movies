import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { MovieDetailsType } from '@/components/moviePageInfo/types/movieDetails.types';

const getMovieDetails = async (id: string): Promise<MovieDetailsType> => {
  const { movie } = resources;
  const url = `${movie}/${id}`;
  const params = { language: 'en' };

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  const response = await axiosInstance(config);
  return response.data;
};

export default getMovieDetails;
