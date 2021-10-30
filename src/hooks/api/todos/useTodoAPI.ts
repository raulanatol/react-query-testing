import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTodoRequest, updateTodoRequest } from '../../../api/todos.api';
import { TodoKeys } from './todos.keys';

export const useTodoAPI = (id: string) => {
  const queryClient = useQueryClient();
  const getQuery = useQuery<any>(TodoKeys.detail(id), getTodoRequest(id));

  const updateQuery = useMutation(updateTodoRequest(id), {
    onMutate: async () => {
      await queryClient.cancelQueries(TodoKeys.detail(id));
      await queryClient.cancelQueries(TodoKeys.all);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(TodoKeys.all);
      await queryClient.invalidateQueries(TodoKeys.detail(id));
    }
  });

  return {
    todo: getQuery.data,
    dataIsLoading: getQuery.isLoading,
    updateTodo: updateQuery.mutate,
    isUpdating: updateQuery.isLoading
  };
};
