import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { IExtendedUser, INewUser } from 'interfaces';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  user?: IExtendedUser;
  handleClose: () => void;
  handleSave: (user: INewUser) => void;
};

const UserDialog = ({ open, user, handleClose, handleSave }: Props) => {
  const { register, handleSubmit, reset, control } = useForm<INewUser>({
    defaultValues: {},
  });

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  const onSubmit: SubmitHandler<INewUser> = data => {
    handleSave(data);
  };

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>
        {user ? `Editar usuario ${user.name}` : 'Nuevo usuario'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} paddingY={2}>
          <TextField label="Nombres" type="text" fullWidth {...register('name')} />
          <TextField label="Correo" type="email" fullWidth {...register('email')} />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            {...register('password')}
            disabled={!!user}
          />
          <Controller
            name="role"
            control={control}
            defaultValue="user"
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select {...field} label="Role" size="small">
                  <MenuItem value="user">Usuario</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            )}
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

export default UserDialog;
