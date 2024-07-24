import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

const LoginButton = () => (
  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
    <IconButton size="large" aria-label="login" color="inherit">
      <AccountCircle />
    </IconButton>
  </Link>
);

export default LoginButton;
