import type { NextPage } from 'next';
import { Button, Stack, Typography } from '@mui/material';

import Layout from 'layout';
import useLessonDialog from 'hooks/useLessonDialog';
import LessonDialog from 'components/lessons/LessonDialog';
import LessonsTable from 'components/lessons/LessonsTable';
import { useLessons } from 'hooks';
import { INewLesson } from '../../interfaces/lesson';
import { create } from '@mui/material/styles/createTransitions';

const LessonsPage: NextPage = () => {
  const {lessons, isLoadingLessons, createLesson} = useLessons(); // prettier-ignore
  const { openLessonDialog, handleOpenLessonDialog, handleCloseLessonDialog } = useLessonDialog(); // prettier-ignore

  const handleNew = () => {
    handleOpenLessonDialog();
  };

  const handleCreateLesson = (data: INewLesson) => {
    createLesson(data).then(() => {
      handleCloseLessonDialog();
    });
  };

  return (
    <Layout pageTitle="Lecciones" pageDescription="Lista de todas las lecciones">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={3}
      >
        <Typography variant="h1">Lecciones</Typography>
        <Button onClick={handleNew}>Crear lección</Button>
      </Stack>

      <LessonsTable lessons={lessons} isLoading={isLoadingLessons} />

      <LessonDialog
        open={openLessonDialog}
        handleClose={handleCloseLessonDialog}
        // TODO: implement save
        handleSave={handleCreateLesson}
      />
    </Layout>
  );
};

export default LessonsPage;
