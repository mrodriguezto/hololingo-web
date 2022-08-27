import type { NextPage } from 'next';
import Layout from 'layout';
import { Button, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import useDialog from 'hooks/useDialog';
import { INewUser } from 'interfaces';
import useUsers from 'hooks/useUsers';
import UsersTable from 'components/users/UsersTable';
import UserDialog from 'components/users/UserDialog';

const UsersPage: NextPage = () => {
  const { users, isLoadingUsers, createUser, deleteUser, updateUser } = useUsers();
  const { isDialogOpened, openDialog, closeDialog } = useDialog();

  const { enqueueSnackbar } = useSnackbar();

  const handleNew = () => {
    openDialog();
  };

  const handleCreateUser = (data: INewUser) => {
    createUser(data)
      .then(() => {
        closeDialog();
        enqueueSnackbar('Usuario creado', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Algo salío mal :(', {
          variant: 'error',
        });
      });
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id)
      .then(() => {
        enqueueSnackbar('Usuario eliminado', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Algo salío mal :(', {
          variant: 'error',
        });
      });
  };

  const handleUpdateUser = (id: string, data: INewUser) => {
    updateUser(id, data)
      .then(() => {
        enqueueSnackbar('Usuario actualizado', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Algo salío mal :(', {
          variant: 'error',
        });
      });
  };

  return (
    <Layout
      pageTitle="Usuarios"
      pageDescription="Lista de todos los usuarios registrados"
    >
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={3}
      >
        <Typography variant="h1">Usuarios</Typography>
        <Button onClick={handleNew}>Crear usuario</Button>
      </Stack>

      <UsersTable
        users={users}
        isLoading={isLoadingUsers}
        deleteUser={handleDeleteUser}
        updateUser={handleUpdateUser}
      />

      <UserDialog
        open={isDialogOpened}
        handleClose={closeDialog}
        handleSave={handleCreateUser}
      />
    </Layout>
  );
};

export default UsersPage;
