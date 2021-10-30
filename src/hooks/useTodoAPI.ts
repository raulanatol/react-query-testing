import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTodoRequest, updateTodoRequest } from '../api/todos.api';

export const useTodoAPI = (id: string) => {
  const queryClient = useQueryClient();
  const getQuery = useQuery<any>(['todo', id], getTodoRequest(id));
  const updateQuery = useMutation(updateTodoRequest(id), {
    onMutate: async () => {
      await queryClient.cancelQueries(['todo', id]);
    },
    onSuccess: async () =>
      queryClient.invalidateQueries(['todo', id])
  });

  return {
    todo: getQuery.data,
    dataIsLoading: getQuery.isLoading,
    updateTodo: updateQuery.mutate,
    isUpdating: updateQuery.isLoading
  };
};
