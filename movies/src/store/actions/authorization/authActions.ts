import { setAxiosAuthToken } from '@/api/axiosConfig';
import { AUTH_ACTION } from '@/store/reducers/authorization/authReducer';
import Cookies from 'js-cookie';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

function login(token: string, userId: string): AUTH_ACTION {
  Cookies.set('token', token);
  Cookies.set('userId', userId);
  setAxiosAuthToken(token);
  return {
    type: LOGIN,
    token,
    userId,
  };
}

function logout(): AUTH_ACTION {
  Cookies.remove('email');
  Cookies.remove('token');
  Cookies.remove('userId');
  setAxiosAuthToken(null);
  return {
    type: LOGOUT,
  };
}

export { LOGIN, LOGOUT, login, logout };
