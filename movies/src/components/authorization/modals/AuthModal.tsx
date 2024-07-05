import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import LoginForm from '../forms/LoginForm';
import RegForm from '../forms/RegForm';

interface AuthModalProps {
  isRegistered: boolean;
  onSwitch: () => void;
  isModalOpen: boolean;
  onToggleModal: () => void;
}

export default function AuthModal({
  isRegistered,
  onSwitch,
  isModalOpen,
  onToggleModal,
}: AuthModalProps) {
  return (
    <Dialog open={isModalOpen} onClose={onToggleModal} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isRegistered ? 'Login' : 'Register'}
        <IconButton edge="end" color="inherit" onClick={onToggleModal} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {isRegistered ? (
          <LoginForm onSwitch={onSwitch} onLogin={onToggleModal} />
        ) : (
          <RegForm onSwitch={onSwitch} />
        )}
      </DialogContent>
    </Dialog>
  );
}
