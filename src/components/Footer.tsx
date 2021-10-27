import React, { FC } from 'react';
import { name } from 'faker';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addTodoRequest, getTodosRequest } from '../api/todos.api';

export const Footer: FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addTodoRequest, {
    onMutate: async (newTodo) => {
      // Cancel re-fetches
      await queryClient.cancelQueries('todos');

      const previous = queryClient.getQueryData('todos') as [];
      queryClient.setQueryData('todos', [...previous, newTodo]);

      // Save previous
      return { previous };
    },

    onError: (error, variables, context: any) => {
      if (context?.previous) {
        queryClient.setQueryData('todos', context.previous);
      }
    },

    // Always refetch after error or success:
    onSettled: () => {
      return queryClient.invalidateQueries('todos');
    }
  });

  const { isLoading, data: todos } = useQuery<any>('todos', getTodosRequest);

  console.log('Footer', isLoading);

  const handleAddElement = async () => {
    mutation.mutate({ id: '_' + Math.random(), name: 'Todo: ' + name.findName() });
  };

  return <div>
    <button onClick={handleAddElement}>Add {isLoading ? '*' : `${todos.length}`}</button>
  </div>;
};
