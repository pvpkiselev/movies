import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

interface TokenModalProps {
  open: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

export default function TokenModal({ open, onSubmit, onClose }: TokenModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: onSubmit,
      }}
    >
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
