import {
  useAddLessonMutation,
  useGetLessonsQuery,
  useUpdateLessonMutation,
} from 'store/services/lessons';
import { INewLesson } from 'interfaces/lesson';

const useLessons = () => {
  const { data: lessons = [], isLoading } = useGetLessonsQuery();
  const [update, { isLoading: isUpdating }] = useUpdateLessonMutation();
  const [create, { isLoading: isCreating }] = useAddLessonMutation();

  const updateLesson = (id: string, data: INewLesson) => {
    return new Promise((resolve, reject) => {
      update({ id, body: data })
        .then(res => {
          resolve(res);
        })
        .catch(res => {
          reject(res);
        });
    });
  };

  const createLesson = (data: INewLesson) => {
    return new Promise((resolve, reject) => {
      create(data)
        .then(res => {
          resolve(res);
        })
        .catch(res => {
          reject(res);
        });
    });
  };

  return { lessons, isLoadingLessons: isLoading, updateLesson, createLesson };
};

export default useLessons;
