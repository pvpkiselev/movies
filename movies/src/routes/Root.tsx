import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { selectIsAuth } from '@/store/auth/authSelectors';
import { useAppSelector } from '@/store/redux';

const Loading: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh">
      <CircularProgress />
    </Box>
  );
};

const LoginFirst: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh">
      <Typography variant="h3" textAlign="center">
        Please login first
      </Typography>
    </Box>
  );
};

function Root() {
  const { checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
      setLoading(false);
    };

    authenticate();
  }, [checkAuth]);

  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%" gap={10}>
      <Header />
      <Toaster position="top-center" />
      {loading ? <Loading /> : isAuth ? <Outlet /> : <LoginFirst />}
    </Box>
  );
}

export default Root;
