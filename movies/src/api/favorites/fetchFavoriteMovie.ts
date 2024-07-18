import { ResponseError } from '@/errors/responseError';
import axiosInstance from '../axiosConfig';
import { HttpStatusCode } from 'axios';
import { ResponseStatusData } from '@/types/response/response.types';

const fetchFavoriteMovie = async (
  userId: string,
  movieId: number,
  isFavorite: boolean
): Promise<ResponseStatusData> => {
  try {
    const fetchFavoriteMovieEndpoint = import.meta.env.VITE_FETCH_FAVORITE_ENDPOINT.replace(
      '{userId}',
      userId
    );

    const body = JSON.stringify({ media_type: 'movie', media_id: movieId, favorite: isFavorite });

    const response = await axiosInstance.post(fetchFavoriteMovieEndpoint, body);

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
