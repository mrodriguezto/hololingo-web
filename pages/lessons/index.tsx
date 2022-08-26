import { useState } from 'react';
import type { NextPage } from 'next';
import { Button, Stack, Typography } from '@mui/material';
import { GridActionsCellItem, GridColumns, GridRowParams } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';

import Layout from 'layout';
import { ILesson } from 'interfaces';
import Table from 'components/Table';
import DeleteDialog from 'components/DeleteDialog';
import useDialogs from 'hooks/useDialogs';
import formatDate from 'utils/formatDate';
import LessonDialog from 'components/lessons/LessonDialog';
import { useGetLessonsQuery } from 'store/services/lessons';
import Loader from 'components/Loader';

const LessonsPage: NextPage = () => {
  const [currentLesson, setCurrentLesson] = useState<ILesson>();
  const { data: lessons = [], isLoading } = useGetLessonsQuery();

  const {
    openDeleteDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    openLessonDialog,
    handleOpenLessonDialog,
    handleCloseLessonDialog,
  } = useDialogs();

  const columns: GridColumns = [
    { field: 'id', headerName: 'N°', width: 50 },
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'title', headerName: 'Título', width: 160 },
    { field: 'description', headerName: 'Descripción', width: 250 },
    { field: 'category_name', headerName: 'Categoría', width: 120 },
    { field: 'createdAt', headerName: 'Fecha creada', width: 150 },
    { field: 'updatedAt', headerName: 'Fecha actualizada', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params: GridRowParams<ILesson>) => [
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
          onClick={handleOpenDeleteDialog}
        />,
      ],
    },
  ];

  // TODO: implement on delete
  const deleteLesson = () => {
    console.log('DELETE');
  };

  const rows = lessons.map((lesson, index) => ({
    id: index + 1,
    ...lesson,
    createdAt: formatDate.format(lesson.createdAt),
    updatedAt: formatDate.format(lesson.updatedAt),
  }));

  const handleEdit = (id: string) => {
    const lesson = rows.find(lesson => lesson._id === id);

    setCurrentLesson(lesson);
    handleOpenLessonDialog();
  };

  const handleNew = () => {
    setCurrentLesson(undefined);
    handleOpenLessonDialog();
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
      {isLoading ? (
        <Loader />
      ) : lessons.length === 0 ? (
        <Typography variant="body1" marginY={2}>
          No hay lecciones registradas
        </Typography>
      ) : (
        <Table rows={rows} columns={columns} />
      )}

      <DeleteDialog
        title="Eliminar Lección"
        description="¿Desea eliminar la lección?"
        open={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        handleConfirm={deleteLesson}
      />

      <LessonDialog
        open={openLessonDialog}
        handleClose={handleCloseLessonDialog}
        lesson={currentLesson}
        // TODO: implement save
        handleSave={() => {}}
      />
    </Layout>
  );
};

export default LessonsPage;
