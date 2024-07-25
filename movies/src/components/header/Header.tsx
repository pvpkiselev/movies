import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectIsAuth } from '@/store/auth/authSelectors';
import LogoutButton from './buttons/LogoutButton';
import LoginButton from './buttons/LoginButton';
import { useAppSelector } from '@/store/redux';

export default function Header() {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <AppBar position="static" sx={{ boxShadow: 'none', paddingInline: 4 }}>
      <Toolbar disableGutters>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Movies
          </Link>
        </Typography>

        {isAuth ? <LogoutButton /> : <LoginButton />}
      </Toolbar>
    </AppBar>
  );
}
