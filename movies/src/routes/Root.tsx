import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { theme } from '@/theme/theme';
import { AuthProvider } from '@/contexts/authContext/AuthProvider';
import { useEffect, useState } from 'react';

function Root() {
  const { authToken } = useAuth();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!authToken);
  }, [authToken]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default Root;
