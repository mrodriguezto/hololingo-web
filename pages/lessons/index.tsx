import type { NextPage } from 'next';
import { Button, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import Layout from 'layout';
import { useLessons, useLessonDialog } from 'hooks';
import LessonDialog from 'components/lessons/LessonDialog';
import LessonsTable from 'components/lessons/LessonsTable';
import { INewLesson } from 'interfaces';

const LessonsPage: NextPage = () => {
  const {lessons, isLoadingLessons, createLesson, deleteLesson, updateLesson} = useLessons(); // prettier-ignore
  const { isLessonDialogOpened, openLessonDialog, closeLessonDialog } = useLessonDialog(); // prettier-ignore
  const { enqueueSnackbar } = useSnackbar();

  const handleNew = () => {
    openLessonDialog();
  };

  const handleCreateLesson = (data: INewLesson) => {
    createLesson(data)
      .then(() => {
        closeLessonDialog();
        enqueueSnackbar('Lección creada', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Algo salío mal :(', {
          variant: 'error',
        });
      });
  };

  const handleDeleteLesson = (id: string) => {
    deleteLesson(id)
      .then(() => {
        enqueueSnackbar('Lección eliminada', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Algo salío mal :(', {
          variant: 'error',
        });
      });
  };

  const handleUpdateLesson = (id: string, data: INewLesson) => {
    updateLesson(id, data)
      .then(() => {
        enqueueSnackbar('Lección actualizada', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Algo salío mal :(', {
          variant: 'error',
        });
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

      <LessonsTable
        lessons={lessons}
        isLoading={isLoadingLessons}
        deleteLesson={handleDeleteLesson}
        updateLesson={handleUpdateLesson}
      />

      <LessonDialog
        open={isLessonDialogOpened}
        handleClose={closeLessonDialog}
        handleSave={handleCreateLesson}
      />
    </Layout>
  );
};

export default LessonsPage;
