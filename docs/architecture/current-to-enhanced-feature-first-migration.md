# Migration Guide: Current Implementation to Enhanced Feature-First Architecture

This document provides a comprehensive, step-by-step guide on how to migrate the current implementation in the `src/` folder to the Enhanced Feature-First Architecture. This guide includes specific file paths, code examples, and detailed instructions to ensure a smooth transition.

## Current Structure

The current implementation has a mixed architecture with elements of page-based organization and some feature-based components. Here's the detailed structure:

```
src/
├── App.tsx                # Main application component
├── app/
│   ├── pages/             # Page components organized by feature
│   │   ├── access-protect/
│   │   │   ├── access-protect-page.tsx
│   │   │   ├── date-range-picker.tsx
│   │   │   └── components/
│   │   ├── contingency-planning/
│   │   │   └── contingency-planning-page.tsx
│   │   ├── home/
│   │   │   └── home-page.tsx
│   │   ├── operations/
│   │   │   └── operations-page.tsx
│   │   ├── properties/
│   │   │   └── properties-page.tsx
│   │   ├── reports/
│   │   │   └── reports-page.tsx
│   │   └── login-page.tsx
│   └── routing/
│       └── app-routes.tsx # Route definitions
├── assets/                # Static assets like images
├── core/                  # Core utilities and configurations
│   ├── config/
│   │   ├── config.ts
│   │   └── constants.ts
│   ├── services/
│   │   └── api/
│   │       └── api-client.ts
│   ├── themes/
│   │   └── theme.ts
│   ├── utils/
│   │   ├── colors.ts
│   │   └── date-utils.ts
│   ├── query-client.tsx
│   └── query-client-provider-state.tsx
├── features/              # Some features already organized
│   ├── authentication/
│   │   └── forms/
│   │       ├── login-form.tsx
│   │       └── register-form.tsx
│   ├── notifications/
│   │   └── Notifications.tsx
│   └── paula/
│       └── Chat.tsx
├── lib/                   # Library code with mixed concerns
│   ├── data/
│   │   └── datasources/
│   │       ├── access-protect-datasource.ts
│   │       ├── firebase-datasource.ts
│   │       └── models/
│   │           └── movement-report-model.ts
│   ├── entities/
│   │   └── requests/
│   │       ├── access-protect-requests.ts
│   │       └── auth-requests.ts
│   └── state/
│       ├── access-protect/
│       │   ├── query-hooks.ts
│       │   └── mutation-hooks.ts
│       ├── authentication/
│       │   ├── query-hooks.ts
│       │   └── mutation-hooks.ts
│       ├── mutation-auth-hooks.ts
│       └── query-auth-hooks.ts
├── shared/                # Shared components
│   └── components/
│       └── shared-app-map.tsx
└── main.tsx               # Application entry point
```

## Target Structure

The Enhanced Feature-First Architecture organizes code primarily by features/domains, with each feature containing its own components, data access, and state management:

```
src/
├── core/                  # Core utilities, configurations, and shared services
│   ├── config/            # Application configuration
│   │   ├── config.ts
│   │   └── constants.ts
│   ├── services/          # Core services
│   │   ├── api/
│   │   │   └── api-client.ts
│   │   └── firebase/
│   │       ├── auth.ts
│   │       ├── firestore.ts
│   │       └── index.ts
│   ├── themes/            # UI themes
│   │   └── theme.ts
│   ├── utils/             # Core utilities
│   │   ├── colors.ts
│   │   └── date-utils.ts
│   ├── query-client.tsx
│   └── query-client-provider-state.tsx
├── features/              # Feature modules
│   ├── access-protect/    # Access protection feature
│   │   ├── components/    # UI components specific to this feature
│   │   │   ├── AccessProtectFeature.tsx
│   │   │   ├── DateRangePicker.tsx
│   │   │   └── index.ts
│   │   ├── hooks/         # Custom hooks for this feature
│   │   │   └── index.ts
│   │   ├── services/      # Services for this feature
│   │   │   ├── access-protect-service.ts
│   │   │   └── index.ts
│   │   ├── state/         # State management for this feature
│   │   │   ├── server/    # Server state management
│   │   │   │   ├── queries.ts
│   │   │   │   ├── mutations.ts
│   │   │   │   └── index.ts
│   │   │   ├── client/    # Client state management
│   │   │   │   ├── context.tsx
│   │   │   │   ├── reducer.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── types/         # TypeScript types for this feature
│   │   │   ├── movement-report.ts
│   │   │   ├── requests.ts
│   │   │   └── index.ts
│   │   ├── utils/         # Utilities specific to this feature
│   │   │   └── index.ts
│   │   ├── index.ts       # Public API for this feature
│   │   └── README.md      # Feature documentation
│   ├── authentication/    # Authentication feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── state/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── index.ts
│   │   └── README.md
│   └── ... (other features)
├── shared/                # Shared components, hooks, and utilities
│   ├── components/        # Shared UI components
│   │   ├── app-map/
│   │   │   ├── AppMap.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── hooks/             # Shared custom hooks
│   ├── services/          # Shared services
│   ├── utils/             # Shared utilities
│   └── index.ts           # Exports all shared items
├── app/                   # Application shell
│   ├── layout/            # Layout components
│   │   ├── AppLayout.tsx
│   │   └── index.ts
│   ├── navigation/        # Navigation components
│   │   ├── MainNav.tsx
│   │   └── index.ts
│   ├── routes.tsx         # Route definitions
│   ├── App.tsx            # Main App component
│   └── index.ts           # Exports App component
└── main.tsx               # Entry point
```

## Detailed Migration Plan

This migration should be implemented in phases to minimize disruption to ongoing development. Each phase focuses on specific parts of the codebase and builds upon the previous phase.

## Phase 1: Preparation and Setup

### 1. Create Directory Structure

First, create the basic directory structure for the Enhanced Feature-First Architecture:

```bash
# Create core directories (most already exist)
mkdir -p src/core/services/firebase

# Create feature directories for each feature
mkdir -p src/features/access-protect/{components,hooks,services,state/server,state/client,types,utils}
mkdir -p src/features/authentication/{components,hooks,services,state/server,state/client,types,utils}
mkdir -p src/features/contingency-planning/{components,hooks,services,state/server,state/client,types,utils}
mkdir -p src/features/home/{components,hooks,services,state/server,state/client,types,utils}
mkdir -p src/features/operations/{components,hooks,services,state/server,state/client,types,utils}
mkdir -p src/features/properties/{components,hooks,services,state/server,state/client,types,utils}
mkdir -p src/features/reports/{components,hooks,services,state/server,state/client,types,utils}
mkdir -p src/features/notifications/{components,hooks,services,state/server,state/client,types,utils}
mkdir -p src/features/paula/{components,hooks,services,state/server,state/client,types,utils}

# Create shared directories
mkdir -p src/shared/{components/app-map,hooks,services,utils}

# Create app directories
mkdir -p src/app/{layout,navigation}
```

### 2. Create Index Files

Create index files for each feature and shared directory to establish the public API:

```bash
# Create index files for features
for feature in access-protect authentication contingency-planning home operations properties reports notifications paula; do
  echo "// Export public API for ${feature} feature" > src/features/${feature}/index.ts
  echo "// Export components" > src/features/${feature}/components/index.ts
  echo "// Export hooks" > src/features/${feature}/hooks/index.ts
  echo "// Export services" > src/features/${feature}/services/index.ts
  echo "// Export state" > src/features/${feature}/state/index.ts
  echo "// Export server state" > src/features/${feature}/state/server/index.ts
  echo "// Export client state" > src/features/${feature}/state/client/index.ts
  echo "// Export types" > src/features/${feature}/types/index.ts
  echo "// Export utilities" > src/features/${feature}/utils/index.ts
done

# Create index files for shared
echo "// Export shared components, hooks, services, and utilities" > src/shared/index.ts
echo "// Export shared components" > src/shared/components/index.ts
echo "// Export app map component" > src/shared/components/app-map/index.ts
echo "// Export shared hooks" > src/shared/hooks/index.ts
echo "// Export shared services" > src/shared/services/index.ts
echo "// Export shared utilities" > src/shared/utils/index.ts

# Create index file for app
echo "// Export App component" > src/app/index.ts
echo "// Export layout components" > src/app/layout/index.ts
echo "// Export navigation components" > src/app/navigation/index.ts
```

### 3. Update Path Aliases

Update `tsconfig.json` to include path aliases for easier imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@core/*": ["./src/core/*"],
      "@features/*": ["./src/features/*"],
      "@shared/*": ["./src/shared/*"],
      "@app/*": ["./src/app/*"]
    }
  }
}
```

## Phase 2: Core and Shared Components Migration

### 1. Core Directory

The current `core/` directory already aligns with the Enhanced Feature-First Architecture. Keep this directory as is, with minor reorganization:

1. Move Firebase-related code from `lib/data/datasources/firebase-datasource.ts` to `core/services/firebase/`:

```typescript
// src/core/services/firebase/index.ts
export * from './auth';
export * from './firestore';

// src/core/services/firebase/auth.ts
// Extract authentication-related code from firebase-datasource.ts

// src/core/services/firebase/firestore.ts
// Extract Firestore-related code from firebase-datasource.ts
```

2. Keep `core/query-client.tsx` and `core/query-client-provider-state.tsx` as they are.

### 2. Shared Directory

Reorganize the `shared/` directory:

1. Move `shared/components/shared-app-map.tsx` to `shared/components/app-map/AppMap.tsx`:

```typescript
// src/shared/components/app-map/AppMap.tsx
import { FC, ReactNode } from 'react';
import { APIProvider, Map, MapProps } from '@vis.gl/react-google-maps';

interface AppMapProps extends MapProps {
  children?: ReactNode;
}

export const AppMap: FC<AppMapProps> = ({ children, ...props }) => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map {...props}>
        {children}
      </Map>
    </APIProvider>
  );
};

// src/shared/components/app-map/index.ts
export { AppMap } from './AppMap';

// src/shared/components/index.ts
export * from './app-map';
```

## Phase 3: Feature Migration

Migrate each feature one by one, starting with the most self-contained ones:

### 1. Authentication Feature

```typescript
// 1. Move forms from features/authentication/forms/ to features/authentication/components/
// src/features/authentication/components/LoginForm.tsx
// Copy from src/features/authentication/forms/login-form.tsx with updated imports

// src/features/authentication/components/RegisterForm.tsx
// Copy from src/features/authentication/forms/register-form.tsx with updated imports

// src/features/authentication/components/index.ts
export { LoginForm } from './LoginForm';
export { RegisterForm } from './RegisterForm';

// 2. Move authentication hooks from lib/state/authentication/ to features/authentication/state/
// src/features/authentication/state/server/queries.ts
// Copy from src/lib/state/authentication/query-hooks.ts with updated imports

// src/features/authentication/state/server/mutations.ts
// Copy from src/lib/state/authentication/mutation-hooks.ts with updated imports

// 3. Move authentication types from lib/entities/ to features/authentication/types/
// src/features/authentication/types/requests.ts
// Copy from src/lib/entities/requests/auth-requests.ts with updated imports

// 4. Create authentication services
// src/features/authentication/services/auth-service.ts
import { firebase } from '@core/services/firebase';

export const authService = {
  login: async (email: string, password: string) => {
    // Implementation
  },
  register: async (email: string, password: string, userData: any) => {
    // Implementation
  },
  logout: async () => {
    // Implementation
  },
  // Other authentication methods
};

// 5. Update the feature's public API
// src/features/authentication/index.ts
export * from './components';
export * from './hooks';
export * from './services';
export * from './state';
export * from './types';
```

### 2. Access Protect Feature

```typescript
// 1. Move components from app/pages/access-protect/ to features/access-protect/components/
// src/features/access-protect/components/AccessProtectFeature.tsx
// Renamed from access-protect-page.tsx with updated imports

// src/features/access-protect/components/DateRangePicker.tsx
// Copy from src/app/pages/access-protect/date-range-picker.tsx with updated imports

// 2. Move server state from lib/state/access-protect/ to features/access-protect/state/server/
// src/features/access-protect/state/server/queries.ts
// Copy from src/lib/state/access-protect/query-hooks.ts with updated imports

// src/features/access-protect/state/server/mutations.ts
// Copy from src/lib/state/access-protect/mutation-hooks.ts with updated imports

// 3. Move types from lib/entities/ to features/access-protect/types/
// src/features/access-protect/types/requests.ts
// Copy from src/lib/entities/requests/access-protect-requests.ts with updated imports

// src/features/access-protect/types/movement-report.ts
// Copy from src/lib/data/datasources/models/movement-report-model.ts with updated imports

// 4. Move services from lib/data/datasources/ to features/access-protect/services/
// src/features/access-protect/services/access-protect-service.ts
// Copy from src/lib/data/datasources/access-protect-datasource.ts with updated imports

// 5. Update the feature's public API
// src/features/access-protect/index.ts
export { AccessProtectFeature } from './components/AccessProtectFeature';
export * from './hooks';
export * from './services';
export * from './state';
export * from './types';
```

### 3. Other Features

Follow the same pattern for each remaining feature:

1. Move page components to feature components
2. Move state management code to feature state
3. Move types to feature types
4. Create or move services to feature services
5. Update the feature's public API

For example, for the Operations feature:

```typescript
// 1. Move components from app/pages/operations/ to features/operations/components/
// src/features/operations/components/OperationsFeature.tsx
// Renamed from operations-page.tsx with updated imports

// 2. Create state management if needed
// src/features/operations/state/server/queries.ts
// src/features/operations/state/client/context.tsx

// 3. Create or move types if needed
// src/features/operations/types/operations.ts

// 4. Create or move services if needed
// src/features/operations/services/operations-service.ts

// 5. Update the feature's public API
// src/features/operations/index.ts
export { OperationsFeature } from './components/OperationsFeature';
export * from './hooks';
export * from './services';
export * from './state';
export * from './types';
```

## Phase 4: App Shell Migration

### 1. Move App Component

```typescript
// src/app/App.tsx
// Copy from src/App.tsx with updated imports

// src/app/index.ts
export { App } from './App';
```

### 2. Create Layout Components

```typescript
// src/app/layout/AppLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../navigation/Header';

export const AppLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// src/app/layout/index.ts
export { AppLayout } from './AppLayout';
```

### 3. Create Navigation Components

```typescript
// src/app/navigation/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/access/protect">Access Protect</Link>
        {/* Other navigation links */}
      </nav>
    </header>
  );
};

// src/app/navigation/index.ts
export { Header } from './Header';
```

### 4. Move Routes

```typescript
// src/app/routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layout';
import { AccessProtectFeature } from '@features/access-protect';
import { HomeFeature } from '@features/home';
import { OperationsFeature } from '@features/operations';
// Import other features

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomeFeature />} />
        <Route path="/access/protect" element={<AccessProtectFeature />} />
        <Route path="/operations" element={<OperationsFeature />} />
        {/* Other routes */}
      </Route>
    </Routes>
  );
};
```

## Phase 5: Detailed File Migrations

This section provides specific examples of file migrations with before and after code snippets to illustrate the changes needed.

### 1. Access Protect Feature Migration

#### Before: Access Protect Page Component

```typescript
// src/app/pages/access-protect/access-protect-page.tsx
import { type FC, Fragment, useState } from 'react';
import { Box, LinearProgress, Paper, useMediaQuery, useTheme } from '@mui/material';
import { SharedAppMap } from '../../../shared/components/shared-app-map.tsx';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangePicker } from './date-range-picker.tsx';
import { useQueryOrganizationMovements } from '../../../features/access-protect/state/server';
import type { MovementReport } from '../../../features/access-protect/services/models/movement-report-model.ts';

const _center = { lat: 54.00366, lng: -2.547855 };
const _zoom = 6;

interface AccessProtectProps {
  isLoading: boolean;
  movements?: MovementReport;
}

const AccessProtect: FC<AccessProtectProps> = ({ isLoading }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(30, 'day'), dayjs()]);

  return (
    <Fragment>
      <Box
        sx={(theme) => ({
          height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 8px)`,
          width: '100%',
          overflow: 'hidden',
        })}
      >
        {isLoading && (<LinearProgress variant="indeterminate" sx={{ width: '100%' }} />)}
        <Box style={{ width: '100%', height: '100%' }}>
          <SharedAppMap defaultZoom={_zoom} defaultCenter={_center} mapTypeId="terrain" zoomControl={!matches} style={{ width: '100%', height: '100%' }}>
            <Box
              sx={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                width: 'auto',
                maxWidth: '90%',
              }}
            >
              <Paper elevation={3} sx={{ p: 2 }}>
                <DateRangePicker value={range} onChange={setRange} />
              </Paper>
            </Box>
          </SharedAppMap>
        </Box>
      </Box>
    </Fragment>
  );
};

export const AccessProtectPage = () => {
  const { isLoading, error, data } = useQueryOrganizationMovements();

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  return<AccessProtect isLoading={isLoading} movements={data}/>;
};
```

#### After: Access Protect Feature Component

```typescript
// src/features/access-protect/components/AccessProtectFeature.tsx
import { type FC, Fragment, useState } from 'react';
import { Box, LinearProgress, Paper, useMediaQuery, useTheme } from '@mui/material';
import { AppMap } from '@shared/components/app-map';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangePicker } from './DateRangePicker';
import { useQueryOrganizationMovements } from '../state/server';
import type { MovementReport } from '../types/movement-report';

const _center = { lat: 54.00366, lng: -2.547855 };
const _zoom = 6;

interface AccessProtectProps {
  isLoading: boolean;
  movements?: MovementReport;
}

const AccessProtect: FC<AccessProtectProps> = ({ isLoading }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(30, 'day'), dayjs()]);

  return (
    <Fragment>
      <Box
        sx={(theme) => ({
          height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 8px)`,
          width: '100%',
          overflow: 'hidden',
        })}
      >
        {isLoading && (<LinearProgress variant="indeterminate" sx={{ width: '100%' }} />)}
        <Box style={{ width: '100%', height: '100%' }}>
          <AppMap defaultZoom={_zoom} defaultCenter={_center} mapTypeId="terrain" zoomControl={!matches} style={{ width: '100%', height: '100%' }}>
            <Box
              sx={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                width: 'auto',
                maxWidth: '90%',
              }}
            >
              <Paper elevation={3} sx={{ p: 2 }}>
                <DateRangePicker value={range} onChange={setRange} />
              </Paper>
            </Box>
          </AppMap>
        </Box>
      </Box>
    </Fragment>
  );
};

export const AccessProtectFeature = () => {
  const { isLoading, error, data } = useQueryOrganizationMovements();

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  return <AccessProtect isLoading={isLoading} movements={data}/>;
};
```

#### Before: Access Protect Service

```typescript
// src/lib/data/datasources/access-protect-datasource.ts
import { MovementReport } from './models/movement-report-model.ts';
import { _get } from '../../../core/services/api/api-client.ts';

export interface ISearchNTraceFilter {
  email?: string;
  vehicleRegNo?: string;
}

export class AccessProtectDatasource {
  private constructQueryString = (filter?: ISearchNTraceFilter): string => {
    if (!filter) return '';

    const params = new URLSearchParams();

    if (filter.email) {
      params.append('Email', filter.email);
    }

    if (filter.vehicleRegNo) {
      params.append('VehicleRegNo', filter.vehicleRegNo);
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  getOrganizationMovements = async (filter?: ISearchNTraceFilter) : Promise<MovementReport> => {
    const queryString = this.constructQueryString(filter);
    const response = await _get(`/accessprotect/api/v1/movements${queryString}`);
    return MovementReport.parse(response['data']);
  };
}
```

#### After: Access Protect Service

```typescript
// src/features/access-protect/services/access-protect-service.ts
import { MovementReport } from '../types/movement-report';
import { _get } from '@core/services/api/api-client';

export interface ISearchNTraceFilter {
  email?: string;
  vehicleRegNo?: string;
}

export class AccessProtectService {
  private constructQueryString = (filter?: ISearchNTraceFilter): string => {
    if (!filter) return '';

    const params = new URLSearchParams();

    if (filter.email) {
      params.append('Email', filter.email);
    }

    if (filter.vehicleRegNo) {
      params.append('VehicleRegNo', filter.vehicleRegNo);
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  getOrganizationMovements = async (filter?: ISearchNTraceFilter) : Promise<MovementReport> => {
    const queryString = this.constructQueryString(filter);
    const response = await _get(`/accessprotect/api/v1/movements${queryString}`);
    return MovementReport.parse(response['data']);
  };
}

export const accessProtectService = new AccessProtectService();
```

#### Before: Movement Report Model

```typescript
// src/lib/data/datasources/models/movement-report-model.ts
import { z } from 'zod';
import { getRandomColor } from '../../../../core/utils/colors.ts';

export const Location = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type Location = z.infer<typeof Location>;

export const TrackAndTraceSite = z.object({
  id: z.string(),
  name: z.string(),
  location: Location,
  color: z.string().optional().nullable(),
}).transform((site) => ({
  ...site,
  color: getRandomColor(),
}));

export type TrackAndTraceSite = z.infer<typeof TrackAndTraceSite>;

// ... rest of the model definitions
```

#### After: Movement Report Type

```typescript
// src/features/access-protect/types/movement-report.ts
import { z } from 'zod';
import { getRandomColor } from '@core/utils/colors';

export const Location = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type Location = z.infer<typeof Location>;

export const TrackAndTraceSite = z.object({
  id: z.string(),
  name: z.string(),
  location: Location,
  color: z.string().optional().nullable(),
}).transform((site) => ({
  ...site,
  color: getRandomColor(),
}));

export type TrackAndTraceSite = z.infer<typeof TrackAndTraceSite>;

// ... rest of the model definitions
```

#### Before: Server State Query Hooks

```typescript
// src/lib/state/access-protect/query-hooks.ts
import { useQuery } from '@tanstack/react-query';
import { AccessProtectDatasource } from '../../data/datasources/access-protect-datasource.ts';

const datasource = new AccessProtectDatasource();

export const useQueryOrganizationMovements = () => {
  return useQuery({
    queryKey: ['queryOrganizationMovements'],
    queryFn: async () => {
      return await datasource.getOrganizationMovements();
    },
  });
};
```

#### After: Server State Query Hooks

```typescript
// src/features/access-protect/state/server/queries.ts
import { useQuery } from '@tanstack/react-query';
import { accessProtectService } from '../../services/access-protect-service';

export const useQueryOrganizationMovements = () => {
  return useQuery({
    queryKey: ['queryOrganizationMovements'],
    queryFn: async () => {
      return await accessProtectService.getOrganizationMovements();
    },
  });
};
```

### 2. Authentication Feature Migration

#### Before: Authentication Query Hooks

```typescript
// src/lib/state/authentication/query-hooks.ts
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../data/datasources/firebase-datasource.ts';

export const useQueryUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      return await getUser(userId);
    },
    enabled: !!userId,
  });
};
```

#### After: Authentication Query Hooks

```typescript
// src/features/authentication/state/server/queries.ts
import { useQuery } from '@tanstack/react-query';
import { authService } from '../../services/auth-service';

export const useQueryUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      return await authService.getUser(userId);
    },
    enabled: !!userId,
  });
};
```

### 3. Shared Components Migration

#### Before: Shared App Map

```typescript
// src/shared/components/shared-app-map.tsx
import { FC, ReactNode } from 'react';
import { APIProvider, Map, MapProps } from '@vis.gl/react-google-maps';

interface SharedAppMapProps extends MapProps {
  children?: ReactNode;
}

export const SharedAppMap: FC<SharedAppMapProps> = ({ children, ...props }) => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map {...props}>
        {children}
      </Map>
    </APIProvider>
  );
};
```

#### After: App Map Component

```typescript
// src/shared/components/app-map/AppMap.tsx
import { FC, ReactNode } from 'react';
import { APIProvider, Map, MapProps } from '@vis.gl/react-google-maps';

interface AppMapProps extends MapProps {
  children?: ReactNode;
}

export const AppMap: FC<AppMapProps> = ({ children, ...props }) => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map {...props}>
        {children}
      </Map>
    </APIProvider>
  );
};
```

### 4. App Routes Migration

#### Before: App Routes

```typescript
// src/app/routing/app-routes.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AccessProtectPage } from '../pages/access-protect/access-protect-page';
import { HomePage } from '../pages/home/home-page';
import { OperationsPage } from '../pages/operations/operations-page';
// Other imports

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/access/protect" element={<AccessProtectPage />} />
        <Route path="/operations" element={<OperationsPage />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
};
```

#### After: App Routes

```typescript
// src/app/routes.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layout';
import { HomeFeature } from '@features/home';
import { AccessProtectFeature } from '@features/access-protect';
import { OperationsFeature } from '@features/operations';
// Other imports

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeFeature />} />
          <Route path="/access/protect" element={<AccessProtectFeature />} />
          <Route path="/operations" element={<OperationsFeature />} />
          {/* Other routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
```

## Phase 6: Import Updates and Testing

### 1. Update Import Statements

After moving files, you'll need to update all import statements throughout the codebase. Here's a systematic approach:

1. **Use Path Aliases**: Update imports to use the path aliases defined in tsconfig.json:

```typescript
// Before
import { MovementReport } from '../../../lib/data/datasources/models/movement-report-model';

// After
import { MovementReport } from '@features/access-protect/types/movement-report';
```

2. **Update Feature Exports**: Make sure each feature exports its public API through its index.ts file:

```typescript
// src/features/access-protect/index.ts
export { AccessProtectFeature } from './components/AccessProtectFeature';
export { useQueryOrganizationMovements } from './state/server';
export { accessProtectService } from './services/access-protect-service';
export type { MovementReport, Location, TrackAndTraceSite } from './types/movement-report';
```

3. **Use a Consistent Import Style**: Standardize import styles across the codebase:

```typescript
// External libraries first
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

// Then internal imports, organized by path alias
import { AppLayout } from '@app/layout';
import { useQueryUser } from '@features/authentication/state/server';
import { AppMap } from '@shared/components/app-map';

// Then relative imports
import { DateRangePicker } from './DateRangePicker';
```

### 2. Testing the Migration

After each phase or feature migration, test thoroughly to ensure everything works as expected:

1. **Run the Application**: Start the development server and verify that the application runs without errors:

```bash
npm run dev
```

2. **Test Feature Functionality**: Navigate to each feature in the application and verify that it works as expected.

3. **Run Unit Tests**: Run the test suite to ensure that all tests pass:

```bash
npm run test
```

4. **Check for Console Errors**: Open the browser console and check for any errors or warnings.

## Phase 7: Special Considerations

### 1. State Management Separation

When separating server state from client state:

```typescript
// src/features/access-protect/state/server/queries.ts
import { useQuery } from '@tanstack/react-query';
import { accessProtectService } from '../../services/access-protect-service';

export const useQueryOrganizationMovements = () => {
  return useQuery({
    queryKey: ['queryOrganizationMovements'],
    queryFn: async () => {
      return await accessProtectService.getOrganizationMovements();
    },
  });
};

// src/features/access-protect/state/client/context.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AccessProtectClientState {
  selectedSiteId: string | null;
  setSelectedSiteId: (id: string | null) => void;
}

const AccessProtectContext = createContext<AccessProtectClientState | undefined>(undefined);

export const AccessProtectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  return (
    <AccessProtectContext.Provider value={{ selectedSiteId, setSelectedSiteId }}>
      {children}
    </AccessProtectContext.Provider>
  );
};

export const useAccessProtectContext = (): AccessProtectClientState => {
  const context = useContext(AccessProtectContext);
  if (context === undefined) {
    throw new Error('useAccessProtectContext must be used within an AccessProtectProvider');
  }
  return context;
};
```

### 2. Feature Documentation

Create a README.md file for each feature to document its purpose, components, and usage:

```markdown
# Access Protect Feature

## Overview

The Access Protect feature provides functionality for tracking and managing access to properties. It displays movement data on a map and allows filtering by date range.

## Components

- `AccessProtectFeature`: The main component for the feature
- `DateRangePicker`: A component for selecting a date range

## State Management

### Server State

- `useQueryOrganizationMovements`: A hook for fetching organization movement data

### Client State

- `useAccessProtectContext`: A hook for accessing and updating client state

## Services

- `accessProtectService`: A service for interacting with the Access Protect API

## Types

- `MovementReport`: The main data model for the feature
- `Location`: A type for geographic coordinates
- `TrackAndTraceSite`: A type for site data

## Usage

```tsx
import { AccessProtectFeature } from '@features/access-protect';

const MyComponent = () => {
  return <AccessProtectFeature />;
};
```
```

## Phased Migration Plan

To minimize disruption to ongoing development, implement the migration in phases:

### Phase 1: Preparation (Week 1)
- Create directory structure
- Set up path aliases
- Create index files

### Phase 2: Core and Shared (Week 1-2)
- Migrate core services
- Migrate shared components

### Phase 3: Feature Migration (Weeks 2-4)
- Migrate one feature per week, starting with the most self-contained
- Week 2: Authentication and Notifications
- Week 3: Access Protect and Home
- Week 4: Operations, Properties, and Reports

### Phase 4: App Shell (Week 5)
- Create layout components
- Migrate routing
- Update main App component

### Phase 5: Testing and Refinement (Week 6)
- Comprehensive testing
- Fix any issues
- Update documentation

## Conclusion

This detailed migration guide provides a comprehensive roadmap for transitioning from the current implementation to the Enhanced Feature-First Architecture. By following these steps, you can reorganize the codebase to be more maintainable, scalable, and aligned with best practices.

The key benefits of this migration include:

1. **Improved Code Organization**: Code is organized by feature, making it easier to understand and maintain
2. **Better Encapsulation**: Features are self-contained with clear boundaries
3. **Enhanced Reusability**: Components are designed to be reusable within features
4. **Clearer Mental Model**: Developers can focus on one feature at a time
5. **Easier Collaboration**: Teams can work on different features with minimal conflicts
6. **Scalability**: The architecture scales well as the application grows

Remember that this is a significant architectural change, so it's recommended to:

1. Follow the phased migration plan
2. Test thoroughly after each phase
3. Update documentation as you go
4. Communicate changes to the team
5. Consider creating a feature template to ensure consistency

By implementing this architecture, you'll set a solid foundation for the future growth and maintainability of the Livestock Protect UI application.
