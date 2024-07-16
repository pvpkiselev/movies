import getTokenVerification from '@/api/getTokenVerification';
import { useAuth } from '@/hooks/useAuth';
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
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface TokenModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TokenModal({ open, onClose }: TokenModalProps) {
  const { setAuthToken } = useAuth();

  const handleTokenSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const token = form.token.value;

    try {
      const tokenVerification = await getTokenVerification(token);

      if (tokenVerification.success) {
        Cookies.set('token', token);
        setAuthToken(token);
        onClose();
      }
    } catch (error) {
      toast.error('Incorrect Token');
      console.error(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleTokenSubmit,
      }}
    >
      <Toaster position="top-center" />
      <DialogTitle>Enter Token</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the token that was sent by email</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="token"
          name="token"
          label="Token"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">OK</Button>
      </DialogActions>
    </Dialog>
  );
}
