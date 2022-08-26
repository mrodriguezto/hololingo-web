import { useState } from 'react';

const useDialog = () => {
  const [isDialogOpened, setOpenDialog] = useState(false);

  const openDialog = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return {
    isDialogOpened,
    openDialog,
    closeDialog,
  };
};

export default useDialog;
