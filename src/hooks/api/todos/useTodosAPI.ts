import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTodosRequest, removeTodoRequest, updateTodoRequest } from '../../../api/todos.api';
import { TodoKeys } from './todos.keys';

export const useTodosAPI = () => {
  const queryClient = useQueryClient();

  const getQuery = useQuery<any[]>(TodoKeys.all, getTodosRequest);

  const removeOneQuery = useMutation(removeTodoRequest, {
    onMutate: async (todoId) => {
      await queryClient.cancelQueries(TodoKeys.all);
      await queryClient.cancelQueries(TodoKeys.detail(todoId));
    },
    onSuccess: async (data, todoId) => {
      await queryClient.invalidateQueries(TodoKeys.all);
      await queryClient.invalidateQueries(TodoKeys.detail(todoId));
    }
  });

  const updateOneQuery = useMutation<any, any, any>((id) => updateTodoRequest(id)({}), {
    onMutate: async (todoId) => {
      await queryClient.cancelQueries(TodoKeys.all);
      await queryClient.cancelQueries(TodoKeys.detail(todoId));
    },
    onSuccess: async (data, todoId) => {
      await queryClient.invalidateQueries(TodoKeys.all);
      await queryClient.invalidateQueries(TodoKeys.detail(todoId));
    }
  });

  return {
    todos: getQuery.data,
    isLoading: getQuery.isLoading,
    removeOne: removeOneQuery.mutate,
    updateOne: updateOneQuery.mutate
  };
};
