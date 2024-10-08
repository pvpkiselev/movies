import { resources } from '../resources';
import { Config, fetchData } from '../axiosConfig';
import { User } from '../types/userResponse.types';

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

  return fetchData<User>(config);
};

export default getUserId;
