import { ResponseError } from '@/errors/responseError';
import { HttpStatusCode } from 'axios';
import { ResponseStatusData } from '@/types/response/response.types';
import { resources } from '../resources';
import { axiosGetInstance } from '../axiosConfig';

const getTokenAuthentication = async (token: string): Promise<ResponseStatusData> => {
  try {
    const resource = resources.authentication;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: resource,
    };

    const response = await axiosGetInstance(config);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error Token Verification data');
    }
  } catch (error) {
    console.error('Error Token Verification data:', error);
    throw error;
  }
};

export default getTokenAuthentication;
