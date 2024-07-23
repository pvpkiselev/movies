import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthDispatch, useAuthSelector } from '@/hooks/useAuth';
import Cookies from 'js-cookie';
import { login } from '@/store/actions/authorization/authActions';

function Root() {
  const { isAuth } = useAuthSelector((state) => state.authReducer);
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    try {
      const token = Cookies.get('token');
      const userId = Cookies.get('userId');
      if (token && userId) {
        authDispatch(login(token, userId));
      }
    } catch (error) {
      console.error(`Storage get token error, ${error}`);
    }
  }, [authDispatch]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <Header />
      <Toaster position="top-center" />
      {isAuth ? (
        <Outlet />
      ) : (
        <Box>
          <Typography variant="h3" textAlign="center">
            Please login first
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Root;
