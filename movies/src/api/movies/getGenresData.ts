import { ResponseError } from '@/errors/responseError';
import { GenreResponse } from '@/types/filters/genres.types';
import { HttpStatusCode } from 'axios';
import { resources } from '../resources';
import { axiosGetInstance } from '../axiosConfig';

const getGenresData = async (): Promise<GenreResponse> => {
  try {
    const { genre, movie, list } = resources;
    const resource = `${genre}/${movie}/${list}`;

    const config = {
      url: resource,
      params: {
        language: 'en',
      },
    };

    const response = await axiosGetInstance(config);

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
