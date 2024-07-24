import { Button } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

const LogoutButton = () => {
  const { handleLogout } = useAuth();

  return (
    <Button size="large" aria-label="logout" color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
