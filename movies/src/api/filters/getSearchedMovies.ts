import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { HttpStatusCode } from 'axios';

const getSearchedMovies = async (searchQuery: string, currentPage: number) => {
  const { search, movie } = resources;
  const url = `${search}/${movie}`;
  const params = {
    query: searchQuery,
    include_adult: false,
    language: 'en',
    page: currentPage,
  };

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
    console.error('Error getting Search Results:', error);
  }
};

export default getSearchedMovies;
