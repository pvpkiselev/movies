import { UserProvider } from '@/contexts/userContext/userProvider';
import { Box } from '@mui/material';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <UserProvider>
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
        <Outlet />
      </Box>
    </UserProvider>
  );
}

export default Root;
