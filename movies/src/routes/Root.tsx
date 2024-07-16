import { Box } from '@mui/material';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

function Root() {
  const { authToken } = useAuth();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!authToken);
  }, [authToken]);

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
      {isAuth && <Outlet />}
    </Box>
  );
}

export default Root;
