import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { ResponseStatusData } from '../types/response.types';

const fetchFavoriteMovie = async (
  userId: string,
  movieId: number,
  isFavorite: boolean
): Promise<ResponseStatusData> => {
  const { account, favorite } = resources;
  const url = `${account}/${userId}/${favorite}`;
  const data = { media_type: 'movie', media_id: movieId, favorite: isFavorite };

  const config: Config = {
    method: 'POST',
    url,
    data,
  };

  const response = await axiosInstance(config);
  return response.data;
};

export default fetchFavoriteMovie;
