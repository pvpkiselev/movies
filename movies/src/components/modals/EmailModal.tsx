import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import Cookies from 'js-cookie';

interface EmailModalProps {
  open: boolean;
  onChangeModal: () => void;
  onClose: () => void;
}

export default function EmailModal({ open, onChangeModal, onClose }: EmailModalProps) {
  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    Cookies.set('email', email);
    onChangeModal();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleEmailSubmit,
        }}
      >
        <DialogTitle>Request Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email to which we will send a login token
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Request Token</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
