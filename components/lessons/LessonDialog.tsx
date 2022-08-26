import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { INewLesson, IExtendedLesson } from 'interfaces/lesson';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  lesson?: IExtendedLesson;
  handleClose: () => void;
  handleSave: (lesson: INewLesson) => void;
};

const LessonDialog = ({ open, lesson, handleClose, handleSave }: Props) => {
  console.log(lesson);

  const { register, handleSubmit, reset } = useForm<INewLesson>({
    defaultValues: {},
  });

  useEffect(() => {
    if (lesson) reset(lesson);
  }, [lesson, reset]);

  const onSubmit: SubmitHandler<INewLesson> = data => {
    handleSave(data);
  };

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>
        {lesson ? `Editar Lección ${lesson!._id}` : 'Nueva Lección'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} paddingY={2}>
          <TextField label="Titulo" type="text" fullWidth {...register('title')} />
          <TextField
            label="Descripción"
            type="text"
            fullWidth
            {...register('description')}
          />
          <TextField
            label="Categoría"
            type="text"
            fullWidth
            {...register('category_name')}
          />
          <TextField
            label="Video de ejemplo (URL)"
            type="text"
            fullWidth
            {...register('example')}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit(onSubmit)} autoFocus>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LessonDialog;
