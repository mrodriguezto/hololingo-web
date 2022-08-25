import { ILesson } from '../../interfaces/lesson';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

type Props = {
  open: boolean;
  lesson?: ILesson;
  handleClose: () => void;
  handleSave: () => void;
};

const LessonDialog = ({ open, lesson, handleClose, handleSave }: Props) => {
  const edit: boolean = !!lesson;

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>
        {edit ? `Editar Lección ${lesson!._id}` : 'Nueva Lección'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} paddingY={2}>
          <TextField label="Titulo" type="text" fullWidth />
          <TextField label="Descripción" type="text" fullWidth />
          <TextField label="Categoría" type="text" fullWidth />
          <TextField label="Video de ejemplo (URL)" type="text" fullWidth />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleSave} autoFocus>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LessonDialog;
