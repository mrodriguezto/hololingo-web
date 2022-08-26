import { useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { GridActionsCellItem, GridColumns, GridRowParams } from '@mui/x-data-grid';

import DeleteDialog from 'components/DeleteDialog';
import Loader from 'components/Loader';
import Table from 'components/Table';
import useDialog from 'hooks/useDialog';
import { IExtendedUser, INewUser, IUser } from 'interfaces';
import formatDate from 'utils/formatDate';
import UserDialog from './UserDialog';

type Props = {
  users: IUser[];
  isLoading: boolean;
  deleteUser: (id: string) => void;
  updateUser: (id: string, data: INewUser) => void;
};

const UsersTable = ({ users, isLoading, deleteUser, updateUser }: Props) => {
  const [currentUser, setCurrentUser] = useState<IExtendedUser>();
  const { isDialogOpened:isDeleteDialogOpened, openDialog:openDeleteDialog, closeDialog:closeDeleteDialog } = useDialog(); // prettier-ignore
  const { isDialogOpened:isUserDialogOpened, openDialog:openUserDialog, closeDialog:closeUserDialog } = useDialog(); // prettier-ignore

  const columns: GridColumns = [
    { field: 'id', headerName: 'N°', width: 50 },
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Nombre', width: 160 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'issuer', headerName: 'Origen', width: 120 },
    { field: 'role', headerName: 'Rol', width: 120 },
    { field: 'createdAt', headerName: 'Fecha creada', width: 150 },
    { field: 'updatedAt', headerName: 'Fecha actualizada', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params: GridRowParams<IUser>) => [
        <GridActionsCellItem
          key={params.id}
          icon={<Edit />}
          label="Delete"
          onClick={() => handleEdit(params.row._id)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<Delete color="error" />}
          label="Delete"
          onClick={() => handleDelete(params.row._id)}
        />,
      ],
    },
  ];

  const changeCurrentUser = (id: string) => {
    const user = rows.find(user => user._id === id);
    setCurrentUser(user);
  };

  const handleDelete = (id: string) => {
    changeCurrentUser(id);
    openDeleteDialog();
  };

  const handleEdit = (id: string) => {
    changeCurrentUser(id);
    openUserDialog();
  };

  const rows = users.map((user, index) => ({
    ...user,
    id: index + 1,
    createdAt: formatDate.format(user.createdAt),
    updatedAt: formatDate.format(user.updatedAt),
  }));

  if (isLoading) {
    return <Loader />;
  }

  if (users.length == 0) {
    <Typography variant="body1" marginY={2}>
      No hay usuarios registrados wadafa
    </Typography>;
  }

  return (
    <>
      <Table rows={rows} columns={columns} />

      <DeleteDialog
        title="Eliminar Lección"
        description="¿Desea eliminar la lección?"
        open={isDeleteDialogOpened}
        handleClose={closeDeleteDialog}
        handleConfirm={() => {
          deleteUser(currentUser!._id);
          closeDeleteDialog();
        }}
      />

      <UserDialog
        open={isUserDialogOpened}
        handleClose={closeUserDialog}
        user={currentUser}
        handleSave={data => {
          updateUser(currentUser!._id, data);
          closeUserDialog();
        }}
      />
    </>
  );
};

export default UsersTable;
