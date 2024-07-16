import { useState } from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import EmailModal from '../modals/EmailModal';
import TokenModal from '../modals/TokenModal';
import Cookies from 'js-cookie';
import { setAxiosAuthToken } from '@/api/axiosConfig';

const EMAIL_MODAL = 'emailModal';
const TOKEN_MODAL = 'tokenModal';

type TokenModalState = false | typeof EMAIL_MODAL | typeof TOKEN_MODAL;

export default function Header() {
  const { authToken, setAuthToken } = useAuth();
  const [activeModal, setActiveModal] = useState<TokenModalState>(false);

  const handleOpenModal = (value: TokenModalState) => setActiveModal(value);
  const handleCloseModal = () => setActiveModal(false);

  const handleLogout = () => {
    setAuthToken(null);
    setAxiosAuthToken(null);
    Cookies.remove('token');
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 'none', paddingInline: 4 }}>
      <Toolbar disableGutters>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Movies
          </Link>
        </Typography>

        {authToken ? (
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
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => handleOpenModal(EMAIL_MODAL)}
          >
            <AccountCircle />
          </IconButton>
        )}
        <EmailModal
          open={activeModal === EMAIL_MODAL}
          onChangeModal={() => handleOpenModal(TOKEN_MODAL)}
          onClose={handleCloseModal}
        />
        <TokenModal open={activeModal === TOKEN_MODAL} onClose={handleCloseModal} />
      </Toolbar>
    </AppBar>
  );
}
