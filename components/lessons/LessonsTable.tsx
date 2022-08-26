import { useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { GridActionsCellItem, GridColumns, GridRowParams } from '@mui/x-data-grid';

import { useLessonDialog, useDeleteDialog } from 'hooks';
import DeleteDialog from 'components/DeleteDialog';
import Loader from 'components/Loader';
import Table from 'components/Table';
import { ILesson, IExtendedLesson, INewLesson } from 'interfaces';
import formatDate from 'utils/formatDate';
import LessonDialog from './LessonDialog';

type Props = {
  lessons: ILesson[];
  isLoading: boolean;
  deleteLesson: (id: string) => void;
  updateLesson: (id: string, data: INewLesson) => void;
};

const LessonsTable = ({ lessons, isLoading, deleteLesson, updateLesson }: Props) => {
  const [currentLesson, setCurrentLesson] = useState<IExtendedLesson>();
  const { isDeleteDialogOpened, openDeleteDialog, closeDeleteDialog } = useDeleteDialog(); // prettier-ignore
  const { isLessonDialogOpened, openLessonDialog, closeLessonDialog } = useLessonDialog(); // prettier-ignore

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
          onClick={() => handleDelete(params.row._id)}
        />,
      ],
    },
  ];

  const changeCurrentLesson = (id: string) => {
    const lesson = rows.find(lesson => lesson._id === id);
    setCurrentLesson(lesson);
  };

  const handleDelete = (id: string) => {
    changeCurrentLesson(id);
    openDeleteDialog();
  };

  const handleEdit = (id: string) => {
    changeCurrentLesson(id);
    openLessonDialog();
  };

  const rows = lessons.map((lesson, index) => ({
    id: index + 1,
    ...lesson,
    createdAt: formatDate.format(lesson.createdAt),
    updatedAt: formatDate.format(lesson.updatedAt),
  }));

  if (isLoading) {
    return <Loader />;
  }

  if (lessons.length == 0) {
    <Typography variant="body1" marginY={2}>
      No hay lecciones registradas
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
          deleteLesson(currentLesson!._id);
          closeDeleteDialog();
        }}
      />

      <LessonDialog
        open={isLessonDialogOpened}
        handleClose={closeLessonDialog}
        lesson={currentLesson}
        // TODO: implement save
        handleSave={data => {
          updateLesson(currentLesson!._id, data);
          closeLessonDialog();
        }}
      />
    </>
  );
};

export default LessonsTable;
