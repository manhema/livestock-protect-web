import { AppRoutes } from './app-routes.tsx';
import { QueryClientProviderState } from '../core/query-client-provider-state.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../core/themes/theme.ts';
import { APIProvider } from '@vis.gl/react-google-maps';
import { config } from '../core/config/config.ts';

const App = () => {
  const libraries = ['places', 'drawing'];

  return (
    <QueryClientProviderState>
      <APIProvider apiKey={config.googleMapsApi.apiKey} libraries={libraries}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes/>
        </ThemeProvider>
      </APIProvider>
    </QueryClientProviderState>
  );
};

export default App;
