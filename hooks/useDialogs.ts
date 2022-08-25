import { useState } from 'react';

const useDialogs = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openLessonDialog, setOpenLessonDialog] = useState(false);

  // Delete Dialog

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Lesson Dialog

  const handleOpenLessonDialog = () => {
    setOpenLessonDialog(true);
  };

  const handleCloseLessonDialog = () => {
    setOpenLessonDialog(false);
  };

  return {
    // Delete
    openDeleteDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,

    // Lesson
    openLessonDialog,
    handleOpenLessonDialog,
    handleCloseLessonDialog,
  };
};

export default useDialogs;
