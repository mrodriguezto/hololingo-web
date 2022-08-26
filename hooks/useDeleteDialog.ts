import { useState } from 'react';

const useDeleteDialog = () => {
  const [isDeleteDialogOpened, setOpenDeleteDialog] = useState(false);

  const openDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return {
    isDeleteDialogOpened,
    openDeleteDialog,
    closeDeleteDialog,
  };
};

export default useDeleteDialog;
