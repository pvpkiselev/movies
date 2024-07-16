import { Box } from '@mui/material';
import Header from '../components/header/Header';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

function Root() {
  const { authState } = useAuth();

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
      {authState.isAuth ? <Outlet /> : <Navigate to="/login" />}
    </Box>
  );
}

export default Root;
