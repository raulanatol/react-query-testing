import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { TodosPage } from './pages/Todos.page';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TodosPage/>
    <ReactQueryDevtools initialIsOpen={false}/>
  </QueryClientProvider>);

export default App;
