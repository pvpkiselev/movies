import { setAxiosAuthToken } from '@/api/axiosConfig';
import Cookies from 'js-cookie';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

type LOGIN_TYPE_ACTION = {
  type: typeof LOGIN;
  token: string;
  userId: string;
};

type LOGOUT_TYPE_ACTION = {
  type: typeof LOGOUT;
};

export type AUTH_ACTION = LOGIN_TYPE_ACTION | LOGOUT_TYPE_ACTION;

function login(token: string, userId: string): LOGIN_TYPE_ACTION {
  Cookies.set('token', token);
  Cookies.set('userId', userId);
  setAxiosAuthToken(token);
  return {
    type: LOGIN,
    token,
    userId,
  };
}

function logout(): LOGOUT_TYPE_ACTION {
  Cookies.remove('email');
  Cookies.remove('token');
  Cookies.remove('userId');
  setAxiosAuthToken(null);
  return {
    type: LOGOUT,
  };
}

export { LOGIN, LOGOUT, login, logout };
