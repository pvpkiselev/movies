import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { HttpStatusCode } from 'axios';

const fetchFavoriteMovie = async (userId: string, movieId: number, isFavorite: boolean) => {
  const { account, favorite } = resources;
  const url = `${account}/${userId}/${favorite}`;
  const data = { media_type: 'movie', media_id: movieId, favorite: isFavorite };

  const config: Config = {
    method: 'POST',
    url,
    data,
  };

  try {
    const response = await axiosInstance(config);
    const isSuccess = response.status === HttpStatusCode.Ok || HttpStatusCode.Created;
    if (isSuccess) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching Favorite Movie:', error);
  }
};

export default fetchFavoriteMovie;
