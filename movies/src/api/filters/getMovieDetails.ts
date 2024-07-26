import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { HttpStatusCode } from 'axios';

const getMovieDetails = async (id: string) => {
  const { movie } = resources;
  const url = `${movie}/${id}`;
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
    console.error('Error getting Movie Details:', error);
  }
};

export default getMovieDetails;
