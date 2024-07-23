import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { login } from '@/store/auth/authActions';
import { useAppDispatch, useAppSelector } from '@/store/store';

function Root() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const token = Cookies.get('token');
      const userId = Cookies.get('userId');
      if (token && userId) {
        dispatch(login(token, userId));
      }
    } catch (error) {
      console.error(`Storage get token error, ${error}`);
    }
  }, [dispatch]);

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
