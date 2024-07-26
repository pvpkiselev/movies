import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { HttpStatusCode } from 'axios';

const getMovieCredits = async (id: string) => {
  const { movie, credits } = resources;
  const url = `${movie}/${id}/${credits}`;
  const params = { language: 'en' };

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  try {
    const response = await axiosInstance(config);
    const isSuccess = response.status === HttpStatusCode.Ok;
    if (isSuccess) {
      return response.data;
    }
  } catch (error) {
    console.error('Error getting Movie Credits:', error);
  }
};

export default getMovieCredits;
