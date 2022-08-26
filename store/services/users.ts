import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { INewUser, IUser } from 'interfaces';
import { baseQuery, providesList } from './config';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: baseQuery('/users'),
  endpoints: builder => ({
    getUsers: builder.query<IUser[], void>({
      query: () => '',
      providesTags: result => providesList(result, 'Users'),
    }),
    addUser: builder.mutation<IUser, INewUser>({
      query: body => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation<IUser, { id: string; body: INewUser }>({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
    }),
    deleteUser: builder.mutation<IUser, string>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
