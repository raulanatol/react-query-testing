import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { getTodosRequest } from '../api/todos.api';
import { RotateCirclesLoader } from 'react-inline-loaders';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const Header: FC = () => {
  const { isLoading, data: todos = [] } = useQuery<any[]>('todos', getTodosRequest);
  console.log('Header', isLoading);

  if (isLoading) {
    return <Container>
      <h1>Total todos:</h1>
      <div>
        <RotateCirclesLoader/>
      </div>
    </Container>;
  }

  if (todos) {
    return <Container>
      <h1>Total todos: {todos.length}</h1>
    </Container>;
  }

  return null;
};
