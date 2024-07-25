import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { User } from '../types/user.types';

const getUserId = async (token: string): Promise<User> => {
  const { account, account_id } = resources;
  const resource = `${account}/${account_id}`;

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

export default getUserId;
