import { useGetLessonsQuery, useUpdateLessonMutation } from 'store/services/lessons';
import { INewLesson } from 'interfaces/lesson';

const useLessons = () => {
  const { data: lessons = [], isLoading } = useGetLessonsQuery();
  const [update, { isLoading: isUpdating }] = useUpdateLessonMutation();

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

  return { lessons, isLoadingLessons: isLoading, updateLesson };
};

export default useLessons;
