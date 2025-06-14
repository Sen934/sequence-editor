import { RouterProvider } from 'react-router';
import { router } from './Router.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/queryClient.ts';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
