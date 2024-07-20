import { ResponseError } from '@/errors/responseError';
import { User } from '@/types/auth/user.types';
import { HttpStatusCode } from 'axios';
import { axiosGetInstance } from '../axiosConfig';
import { resources } from '../resources';

const getUserId = async (): Promise<User> => {
  try {
    const { account, account_id } = resources;
    const resource = account + '/' + account_id;

    const config = {
      url: resource,
    };

    const response = await axiosGetInstance(config);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching user ID data');
    }
  } catch (error) {
    console.error('Failed to fetch user ID data:', error);
    throw error;
  }
};

export default getUserId;
