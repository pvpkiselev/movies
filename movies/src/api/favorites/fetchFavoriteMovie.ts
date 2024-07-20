import { ResponseError } from '@/errors/responseError';
import { HttpStatusCode } from 'axios';
import { ResponseStatusData } from '@/types/response/response.types';
import { axiosPostInstance } from '../axiosConfig';
import { resources } from '../resources';

const fetchFavoriteMovie = async (
  userId: string,
  movieId: number,
  isFavorite: boolean
): Promise<ResponseStatusData> => {
  try {
    const { account, favorite } = resources;
    const resource = `${account}/${userId}/${favorite}`;

    const body = JSON.stringify({ media_type: 'movie', media_id: movieId, favorite: isFavorite });

    const config = {
      url: resource,
      data: body,
    };

    const response = await axiosPostInstance(config);

    if (response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.Created) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching Favorite Movie');
    }
  } catch (error) {
    console.error('Failed to fetch Favorite Movie:', error);
    throw error;
  }
};

export default fetchFavoriteMovie;
