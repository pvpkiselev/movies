import { resources } from '../resources';
import { apiRequest, ApiRequest } from '../axiosConfig';
import { ResponseStatusData } from '../response.types';

const getTokenVerification = async (token: string): Promise<ResponseStatusData> => {
  const resource = resources.authentication;

  const requestConfig: ApiRequest = {
    method: 'GET',
    url: resource,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return apiRequest<ResponseStatusData>(requestConfig);
};

export default getTokenVerification;
