import { useState } from 'react';

const useLessonDialog = () => {
  const [isLessonDialogOpened, setOpenLessonDialog] = useState(false);

  // Lesson Dialog

  const openLessonDialog = () => {
    setOpenLessonDialog(true);
  };

  const closeLessonDialog = () => {
    setOpenLessonDialog(false);
  };

  return {
    isLessonDialogOpened,
    openLessonDialog,
    closeLessonDialog,
  };
};

export default useLessonDialog;
