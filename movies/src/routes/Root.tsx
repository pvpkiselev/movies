import { Box } from '@mui/material';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Toaster } from 'react-hot-toast';

function Root() {
  const authState = useAuth();

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
      {authState.isAuth && <Outlet />}
    </Box>
  );
}

export default Root;
