import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProvidersWrapper } from './providers/ProvidersWrapper';
import { routes } from './routes';

const router = createBrowserRouter(routes);

export const App: React.FC = () => {
  return (
    <ProvidersWrapper>
      <RouterProvider router={router} />
    </ProvidersWrapper>
  );
};

export default App;
