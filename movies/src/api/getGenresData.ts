import { ResponseError } from '@/errors/responseError';
import MOVIES_REQUEST from './requestOptions';

const genresEndpoint = '/genre/movie/list?language=en';

const getGenresData = async () => {
  try {
    const response = await MOVIES_REQUEST.get(genresEndpoint);

    const okResponseCode = 200;

    if (response.status !== okResponseCode) {
      throw new ResponseError('Error fetching genres data');
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    throw error;
  }
};

export default getGenresData;
