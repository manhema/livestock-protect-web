import { QueryClientProviderState } from '../core/query-client-provider-state.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../core/themes/theme.ts';
import { APIProvider } from '@vis.gl/react-google-maps';
import { config } from '../core/config/config.ts';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '../router.tsx';

const App = () => {
  const libraries = ['places', 'drawing'];

  return (
    <QueryClientProviderState>
      <APIProvider apiKey={config.googleMapsApi.apiKey} libraries={libraries}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/*<AppRoutes/>*/}
          <RouterProvider router={router} />
        </ThemeProvider>
      </APIProvider>
    </QueryClientProviderState>
  );
};

export default App;
