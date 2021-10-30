import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTodosRequest, removeTodoRequest, updateTodoRequest } from '../api/todos.api';

export const useTodosAPI = () => {
  const queryClient = useQueryClient();
  const getQuery = useQuery<any[]>('todos', getTodosRequest);
  const removeOneQuery = useMutation(removeTodoRequest, {
    onMutate: async () =>
      await queryClient.cancelQueries('todos'),
    onSuccess: async () =>
      await queryClient.invalidateQueries('todos')
  });
  const updateOneQuery = useMutation<any, any, any>(
    (id) => updateTodoRequest(id)({}),
    {
      onMutate: async (variables) => {
        await queryClient.cancelQueries(['todos']);
        await queryClient.cancelQueries(['todo', variables]);
      },
      onSuccess: async (variables) => {
        await queryClient.invalidateQueries(['todos']);
        await queryClient.invalidateQueries(['todo', variables]);
      }
    });

  return {
    todos: getQuery.data,
    isLoading: getQuery.isLoading,
    removeOne: removeOneQuery.mutate,
    updateOne: updateOneQuery.mutate
  };
};
