import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { HttpStatusCode } from 'axios';

const getTokenVerification = async (token: string) => {
  const resource = resources.authentication;

  const config: Config = {
    method: 'GET',
    url: resource,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axiosInstance(config);
    const isSuccess = response.status === HttpStatusCode.Ok;
    if (isSuccess) {
      return response.data;
    }
  } catch (error) {
    console.error('Token verification error:', error);
  }
};

export default getTokenVerification;
