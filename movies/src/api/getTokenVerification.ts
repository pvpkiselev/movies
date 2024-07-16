import { ResponseError } from '@/errors/responseError';
import axios from 'axios';
import { API_URL } from './constants';

const tokenVerificationEndpoint = '/authentication';

const getTokenVerification = async (token: string) => {
  try {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_URL}${tokenVerificationEndpoint}`, options);

    const okResponseCode = 200;

    if (response.status !== okResponseCode) {
      throw new ResponseError('Error Token Verification data');
    }

    return response.data;
  } catch (error) {
    console.error('Error Token Verification data:', error);
    throw error;
  }
};

export default getTokenVerification;
