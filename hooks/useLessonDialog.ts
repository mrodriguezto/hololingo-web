import { useState } from 'react';

const useLessonDialog = () => {
  const [openLessonDialog, setOpenLessonDialog] = useState(false);

  // Lesson Dialog

  const handleOpenLessonDialog = () => {
    setOpenLessonDialog(true);
  };

  const handleCloseLessonDialog = () => {
    setOpenLessonDialog(false);
  };

  return {
    openLessonDialog,
    handleOpenLessonDialog,
    handleCloseLessonDialog,
  };
};

export default useLessonDialog;
