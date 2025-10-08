import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { queryClient } from './query-client.tsx';

export const QueryClientProviderState = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}): ReactNode => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
