import {
  useAddLessonMutation,
  useDeleteLessonMutation,
  useGetLessonsQuery,
  useUpdateLessonMutation,
} from 'store/services/lessons';
import { INewLesson } from 'interfaces/lesson';

const useLessons = () => {
  const { data: lessons = [], isLoading } = useGetLessonsQuery();
  const [createMutation, { isLoading: isCreating }] = useAddLessonMutation();
  const [updateMutation, { isLoading: isUpdating }] = useUpdateLessonMutation();
  const [deleteMutation, { isLoading: isDeleting }] = useDeleteLessonMutation();

  const createLesson = (data: INewLesson) => {
    return new Promise((resolve, reject) => {
      createMutation(data)
        .then(res => {
          resolve(res);
        })
        .catch(res => {
          reject(res);
        });
    });
  };

  const updateLesson = (id: string, data: INewLesson) => {
    return new Promise((resolve, reject) => {
      updateMutation({ id, body: data })
        .then(res => {
          resolve(res);
        })
        .catch(res => {
          reject(res);
        });
    });
  };

  const deleteLesson = (id: string) => {
    return new Promise((resolve, reject) => {
      deleteMutation(id)
        .then(res => {
          resolve(res);
        })
        .catch(res => {
          reject(res);
        });
    });
  };

  return {
    lessons,
    isLoadingLessons: isLoading,
    createLesson,
    isCreating,
    updateLesson,
    isUpdating,
    deleteLesson,
    isDeleting,
  };
};

export default useLessons;
