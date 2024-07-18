import { ResponseError } from '@/errors/responseError';
import axiosInstance from '../axiosConfig';
import { GenreResponse } from '@/types/filters/genres.types';
import { HttpStatusCode } from 'axios';

const getGenresData = async (): Promise<GenreResponse> => {
  try {
    const genresEndpoint = import.meta.env.VITE_GENRES_ENDPOINT;

    const response = await axiosInstance.get(genresEndpoint);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching genres data');
    }
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    throw error;
  }
};

export default getGenresData;
