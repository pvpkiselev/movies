import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { ResponseStatusData } from '../types/response.types';

const getTokenVerification = async (token: string): Promise<ResponseStatusData> => {
  const resource = resources.authentication;

  const config: Config = {
    method: 'GET',
    url: resource,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance(config);
  return response.data;
};

export default getTokenVerification;
