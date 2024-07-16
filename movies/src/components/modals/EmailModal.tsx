import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
interface EmailModalProps {
  open: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

export default function EmailModal({ open, onSubmit, onClose }: EmailModalProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: 'form',
          onSubmit: onSubmit,
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
