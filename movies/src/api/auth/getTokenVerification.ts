import { resources } from '../resources';
import { Config, fetchData } from '../axiosConfig';
import { ResponseStatusData } from '../types/dataResponse.types';

const getTokenVerification = async (token: string): Promise<ResponseStatusData> => {
  const resource = resources.authentication;

  const config: Config = {
    method: 'GET',
    url: resource,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetchData<ResponseStatusData>(config);
};

export default getTokenVerification;
