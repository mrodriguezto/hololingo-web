import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  handleConfirm: () => void;
};

const DeleteDialog = ({
  open,
  handleClose,
  title,
  description,
  handleConfirm,
}: Props) => {
  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
