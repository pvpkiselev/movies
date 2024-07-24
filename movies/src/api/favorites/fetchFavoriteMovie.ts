import { resources } from '../resources';
import { ApiRequest, apiRequest } from '../axiosConfig';
import { ResponseStatusData } from '../response.types';

const fetchFavoriteMovie = async (
  userId: string,
  movieId: number,
  isFavorite: boolean
): Promise<ResponseStatusData> => {
  const { account, favorite } = resources;
  const url = `${account}/${userId}/${favorite}`;
  const data = { media_type: 'movie', media_id: movieId, favorite: isFavorite };

  const requestConfig: ApiRequest = {
    method: 'POST',
    url,
    data,
  };

  return apiRequest(requestConfig);
};

export default fetchFavoriteMovie;
