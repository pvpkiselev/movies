import { axiosInstance, Config } from '../axiosConfig';
import { resources } from '../resources';
import { HttpStatusCode } from 'axios';

const getFavoriteMoviesList = async (userId: string, currentPage?: number) => {
  const { account, favorite, movies } = resources;
  const url = `${account}/${userId}/${favorite}/${movies}`;
  const params = { language: 'en', page: currentPage };

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
    console.error('Error getting Favorite Movie List:', error);
  }
};

export default getFavoriteMoviesList;
