import { User } from '@/types/auth/user.types';
import { resources } from '../resources';
import { apiRequest, ApiRequest } from '../axiosConfig';

const getUserId = async (token: string): Promise<User> => {
  const { account, account_id } = resources;
  const resource = `${account}/${account_id}`;

  const requestConfig: ApiRequest = {
    method: 'GET',
    url: resource,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return apiRequest<User>(requestConfig);
};

export default getUserId;
