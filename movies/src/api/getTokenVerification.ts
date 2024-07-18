import { ResponseError } from '@/errors/responseError';
import { HttpStatusCode } from 'axios';
import { ResponseStatusData } from '@/types/response/response.types';
import axiosInstance from './axiosConfig';

const getTokenVerification = async (token: string): Promise<ResponseStatusData> => {
  try {
    const tokenVerificationEndpoint = import.meta.env.VITE_TOKEN_VERIFICATION_ENDPOINT;

    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosInstance.get(tokenVerificationEndpoint, options);

    if (response.status === HttpStatusCode.Ok) {
      console.log(response.data);
      return response.data;
    } else {
      throw new ResponseError('Error Token Verification data');
    }
  } catch (error) {
    console.error('Error Token Verification data:', error);
    throw error;
  }
};

export default getTokenVerification;
