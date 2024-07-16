import { Box } from '@mui/material';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

function Root() {
  const { authToken } = useAuth();

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
      {authToken && <Outlet />}
    </Box>
  );
}

export default Root;
