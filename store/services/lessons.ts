import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ILesson, INewLesson } from 'interfaces';
import { baseQuery, providesList } from './config';

export const lessonsApi = createApi({
  reducerPath: 'lessonsApi',
  tagTypes: ['Lessons'],
  baseQuery: baseQuery('/lessons'),
  endpoints: builder => ({
    getLessons: builder.query<ILesson[], void>({
      query: () => '/',
      providesTags: result => providesList(result, 'Lessons'),
    }),
    addLesson: builder.mutation<ILesson, INewLesson>({
      query: body => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Lessons', id: 'LIST' }],
    }),
    updateLesson: builder.mutation<ILesson, { id: string; body: INewLesson }>({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Lessons', id }],
    }),
    deleteLesson: builder.mutation<ILesson, string>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Lessons', id }],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useAddLessonMutation,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
} = lessonsApi;
