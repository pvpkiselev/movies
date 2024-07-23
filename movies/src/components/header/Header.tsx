import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/store/auth/authActions';

export default function Header() {
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 'none', paddingInline: 4 }}>
      <Toolbar disableGutters>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Movies
          </Link>
        </Typography>

        {isAuth ? (
          <Button
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
