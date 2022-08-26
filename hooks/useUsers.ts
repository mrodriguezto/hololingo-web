import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from 'store/services/users';
import { INewUser } from 'interfaces';

const useUsers = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [createMutation, { isLoading: isCreating }] = useAddUserMutation();
  const [updateMutation, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteMutation, { isLoading: isDeleting }] = useDeleteUserMutation();

  const createUser = (data: INewUser) => {
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

  const updateUser = (id: string, data: INewUser) => {
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

  const deleteUser = (id: string) => {
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
    users,
    isLoadingUsers: isLoading,
    createUser,
    isCreating,
    updateUser,
    isUpdating,
    deleteUser,
    isDeleting,
  };
};

export default useUsers;
