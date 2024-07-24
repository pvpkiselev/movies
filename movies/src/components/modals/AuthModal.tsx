import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

interface AuthModalProps {
  open: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  title: string;
  description: string;
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  buttonText: string;
}

export default function AuthModal(props: AuthModalProps) {
  const { open, onSubmit, onClose, title, description, id, name, label, type, buttonText } = props;

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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id={id}
            name={name}
            label={label}
            type={type}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">{buttonText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
