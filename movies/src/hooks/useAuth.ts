import { useCallback } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

import getTokenVerification from '@/api/auth/getTokenVerification';
import getUserId from '@/api/auth/getUserId';
import { setAxiosAuthToken } from '@/api/axiosConfig';
import { login, logout } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/redux';
import { toastMessages } from '@/helpers/constants';

export function useAuth() {
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(async (token: string) => {
    try {
      const tokenVerification = await getTokenVerification(token);

      if (tokenVerification.success) {
        const userIdResponse = await getUserId(token);
        const userId = userIdResponse.id.toString();

        Cookies.set('token', token);
        Cookies.set('userId', userId);
        setAxiosAuthToken(token);

        dispatch(login({ token, userId }));
        return true;
      }
    } catch (error) {
      toast.error(toastMessages.auth.login_failed);
      console.error(toastMessages.auth.login_failed, error);
    }
  }, []);

  const handleLogout = useCallback(() => {
    Cookies.remove('token');
    Cookies.remove('userId');
    setAxiosAuthToken(null);
    dispatch(logout());
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const token = Cookies.get('token');
      const userId = Cookies.get('userId');
      if (token && userId) {
        setAxiosAuthToken(token);
        dispatch(login({ token, userId }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error(toastMessages.auth.storage_failed, error);
      dispatch(logout());
    }
  }, [handleLogin]);

  return {
    handleLogin,
    handleLogout,
    checkAuth,
  };
}
