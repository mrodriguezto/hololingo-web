import { useState } from 'react';

const useDeleteDialog = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return {
    openDeleteDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
  };
};

export default useDeleteDialog;
