import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { HttpStatusCode } from 'axios';

const getGenresData = async () => {
  const { genre, movie, list } = resources;
  const url = `${genre}/${movie}/${list}`;
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
    console.error('Error getting Genres Data:', error);
  }
};

export default getGenresData;
