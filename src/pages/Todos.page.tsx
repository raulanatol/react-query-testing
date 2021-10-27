import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { getTodosRequest } from '../api/todos.api';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TodoList } from '../components/TodoList';
import styled from '@emotion/styled';
import { Debugger } from '../components/Debugger';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftColumn = styled.div`
  width: 70%;
`;

export const TodosPage: FC = () => {
  const { isLoading } = useQuery<any[]>('todos', getTodosRequest);
  console.log('TodosPage', isLoading);

  return <Container>
    <LeftColumn>
      <Header/>
      <TodoList/>
      <Footer/>
    </LeftColumn>
    <div>
      <Debugger/>
    </div>
  </Container>;
};
