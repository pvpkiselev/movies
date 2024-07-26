import { resources } from '../resources';
import { axiosInstance, Config } from '../axiosConfig';
import { HttpStatusCode } from 'axios';

const getUserId = async (token: string) => {
  const { account, account_id } = resources;
  const resource = `${account}/${account_id}`;

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
    console.error('Error getting User Id:', error);
  }
};

export default getUserId;
