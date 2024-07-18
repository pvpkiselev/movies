import { ResponseError } from '@/errors/responseError';
import axiosInstance from './axiosConfig';
import { User } from '@/types/auth/user.types';
import { HttpStatusCode } from 'axios';

const getUserId = async (): Promise<User> => {
  try {
    const userIdEndpoint = import.meta.env.VITE_USER_ID_ENDPOINT;

    const response = await axiosInstance.get(userIdEndpoint);

    if (response.status === HttpStatusCode.Ok) {
      console.log(response.data);
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
