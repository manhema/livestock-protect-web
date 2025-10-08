# Enhanced Feature-First Architecture: Detailed Folder Structure

This document expands on the Enhanced Feature-First Architecture by providing detailed information about what should be included in each folder, with a specific focus on layout, state, and data management.

## Overview

The Enhanced Feature-First Architecture organizes code primarily by features/domains, with each feature containing its own components, data access, and state management. This document provides detailed guidance on what should be included in each folder within this architecture.

## Top-Level Directory Structure

```
src/
├── core/                  # Core utilities, configurations, and shared services
├── features/              # Feature modules
├── shared/                # Shared components, hooks, and utilities
├── app/                   # Application shell
└── main.tsx               # Entry point
```

## Core Directory

The `core` directory contains utilities, configurations, and services that are fundamental to the application and used across multiple features.

```
core/
├── config/                # Application configuration
│   ├── config.ts          # Environment-specific configuration
│   ├── constants.ts       # Application constants
│   └── themes.ts          # UI themes
├── services/              # Core services
│   ├── firebase/          # Firebase integration
│   │   ├── auth.ts        # Authentication service
│   │   ├── firestore.ts   # Firestore service
│   │   └── index.ts       # Public API
│   ├── analytics/         # Analytics service
│   └── logging/           # Logging service
├── utils/                 # Core utilities
│   ├── date.ts            # Date utilities
│   ├── formatting.ts      # Formatting utilities
│   ├── validation.ts      # Validation utilities
│   └── testing.ts         # Testing utilities
└── types/                 # Core type definitions
    ├── common.ts          # Common types
    └── api.ts             # API-related types
```

## Features Directory

Each feature in the `features` directory should be self-contained with its own components, hooks, services, types, and utilities.

```
features/
├── feature-name/
│   ├── components/        # UI components specific to this feature
│   ├── hooks/             # Custom hooks for this feature
│   ├── services/          # Services for this feature
│   ├── state/             # State management for this feature
│   ├── types/             # TypeScript types for this feature
│   ├── utils/             # Utilities specific to this feature
│   ├── index.ts           # Public API for this feature
│   └── README.md          # Feature documentation
└── ...
```

### Components Folder

The `components` folder within a feature contains UI components specific to that feature.

```
components/
├── FeatureComponent.tsx   # Main component for the feature
├── FeatureForm.tsx        # Form component for the feature
├── FeatureList.tsx        # List component for the feature
├── FeatureDetail.tsx      # Detail component for the feature
├── FeatureCard.tsx        # Card component for the feature
├── index.ts               # Exports all components
└── __tests__/             # Tests for components
    ├── FeatureComponent.test.tsx
    └── ...
```

### Layout Folder

For features that require complex layouts, a `layout` folder can be added to organize layout-specific components.

```
layout/
├── FeatureLayout.tsx      # Main layout for the feature
├── FeatureHeader.tsx      # Header component for the feature
├── FeatureSidebar.tsx     # Sidebar component for the feature
├── FeatureFooter.tsx      # Footer component for the feature
├── index.ts               # Exports all layout components
└── __tests__/             # Tests for layout components
    ├── FeatureLayout.test.tsx
    └── ...
```

The layout components should:
- Define the overall structure of the feature's UI
- Handle responsive design considerations
- Manage the positioning of other components
- Not contain business logic or data fetching
- Be composable and reusable within the feature

Example of a layout component:

```tsx
// FeatureLayout.tsx
import React from 'react';
import { FeatureHeader } from './FeatureHeader';
import { FeatureSidebar } from './FeatureSidebar';
import { FeatureFooter } from './FeatureFooter';

interface FeatureLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const FeatureLayout: React.FC<FeatureLayoutProps> = ({
  children,
  showSidebar = true,
}) => {
  return (
    <div className="feature-layout">
      <FeatureHeader />
      <div className="feature-content">
        {showSidebar && <FeatureSidebar />}
        <main className="feature-main">{children}</main>
      </div>
      <FeatureFooter />
    </div>
  );
};
```

### State Folder

The `state` folder manages the feature's state using React Context, hooks, or other state management solutions. We recommend separating server state from client state for better maintainability and performance.

```
state/
├── server/                # Server state management
│   ├── queries.ts         # React Query hooks for fetching data
│   ├── mutations.ts       # React Query hooks for modifying data
│   └── index.ts           # Exports all server state hooks
├── client/                # Client state management
│   ├── context.tsx        # Context provider for client state
│   ├── reducer.ts         # Reducer for client state
│   ├── actions.ts         # Actions for client state
│   └── index.ts           # Exports all client state hooks
├── index.ts               # Exports all state-related items
└── __tests__/             # Tests for state management
    ├── clientState.test.ts
    ├── serverState.test.ts
    └── ...
```

The state management should:
- Encapsulate the feature's state logic
- Provide a clean API for components to interact with state
- Handle loading, error, and success states
- Manage form state if applicable
- Separate server state (data from APIs) from client state (UI state)

For detailed guidance on separating server state from client state, see [Server-Client State Separation](../server-client-state-separation.md).

Example of a context provider:

```tsx
// FeatureContext.tsx
import React, { createContext, useReducer, useContext } from 'react';
import { featureReducer, initialState } from './featureReducer';
import type { FeatureState, FeatureAction } from '../types/state';

interface FeatureContextType {
  state: FeatureState;
  dispatch: React.Dispatch<FeatureAction>;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export const FeatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(featureReducer, initialState);

  return (
    <FeatureContext.Provider value={{ state, dispatch }}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatureContext = (): FeatureContextType => {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useFeatureContext must be used within a FeatureProvider');
  }
  return context;
};
```

Example of a custom hook for accessing feature state:

```tsx
// useFeatureState.ts
import { useFeatureContext } from './FeatureContext';
import { selectFeatureItems, selectIsLoading, selectError } from './featureSelectors';
import { loadFeatureItems, addFeatureItem, updateFeatureItem, removeFeatureItem } from './featureActions';

export const useFeatureState = () => {
  const { state, dispatch } = useFeatureContext();

  return {
    // State
    items: selectFeatureItems(state),
    isLoading: selectIsLoading(state),
    error: selectError(state),

    // Actions
    loadItems: () => dispatch(loadFeatureItems()),
    addItem: (item) => dispatch(addFeatureItem(item)),
    updateItem: (id, updates) => dispatch(updateFeatureItem(id, updates)),
    removeItem: (id) => dispatch(removeFeatureItem(id)),
  };
};
```

### Data Folder

The `data` folder handles data access, API calls, and data transformations for the feature.

```
data/
├── api/                   # API-related code
│   ├── featureApi.ts      # API client for the feature
│   └── featureEndpoints.ts # API endpoints for the feature
├── models/                # Data models
│   ├── featureModel.ts    # Data model for the feature
│   └── featureMappers.ts  # Functions to map API data to/from domain models
├── repositories/          # Repositories for data access
│   └── featureRepository.ts # Repository for the feature
├── index.ts               # Exports all data-related items
└── __tests__/             # Tests for data access
    ├── featureApi.test.ts
    └── ...
```

The data management should:
- Abstract API calls behind a clean interface
- Handle data transformation between API and domain models
- Manage caching and data persistence if needed
- Handle error cases and retries
- Provide hooks for data fetching

Example of an API client:

```tsx
// featureApi.ts
import { apiClient } from '@/core/services/api';
import { FeatureEndpoints } from './featureEndpoints';
import type { FeatureItemDTO, CreateFeatureItemDTO, UpdateFeatureItemDTO } from '../models/featureModel';

export const featureApi = {
  getItems: async (): Promise<FeatureItemDTO[]> => {
    const response = await apiClient.get<FeatureItemDTO[]>(FeatureEndpoints.getItems);
    return response.data;
  },

  getItemById: async (id: string): Promise<FeatureItemDTO> => {
    const response = await apiClient.get<FeatureItemDTO>(`${FeatureEndpoints.getItemById}/${id}`);
    return response.data;
  },

  createItem: async (item: CreateFeatureItemDTO): Promise<FeatureItemDTO> => {
    const response = await apiClient.post<FeatureItemDTO>(FeatureEndpoints.createItem, item);
    return response.data;
  },

  updateItem: async (id: string, updates: UpdateFeatureItemDTO): Promise<FeatureItemDTO> => {
    const response = await apiClient.patch<FeatureItemDTO>(`${FeatureEndpoints.updateItem}/${id}`, updates);
    return response.data;
  },

  deleteItem: async (id: string): Promise<void> => {
    await apiClient.delete(`${FeatureEndpoints.deleteItem}/${id}`);
  },
};
```

Example of a repository:

```tsx
// featureRepository.ts
import { featureApi } from '../api/featureApi';
import { mapToFeatureItem, mapToFeatureItemDTO, mapToFeatureItems } from '../models/featureMappers';
import type { FeatureItem, CreateFeatureItem, UpdateFeatureItem } from '../models/featureModel';

export const featureRepository = {
  getItems: async (): Promise<FeatureItem[]> => {
    const dtos = await featureApi.getItems();
    return mapToFeatureItems(dtos);
  },

  getItemById: async (id: string): Promise<FeatureItem> => {
    const dto = await featureApi.getItemById(id);
    return mapToFeatureItem(dto);
  },

  createItem: async (item: CreateFeatureItem): Promise<FeatureItem> => {
    const dto = mapToFeatureItemDTO(item);
    const createdDto = await featureApi.createItem(dto);
    return mapToFeatureItem(createdDto);
  },

  updateItem: async (id: string, updates: UpdateFeatureItem): Promise<FeatureItem> => {
    const dto = mapToFeatureItemDTO(updates);
    const updatedDto = await featureApi.updateItem(id, dto);
    return mapToFeatureItem(updatedDto);
  },

  deleteItem: async (id: string): Promise<void> => {
    await featureApi.deleteItem(id);
  },
};
```

## Shared Directory

The `shared` directory contains components, hooks, services, and utilities that are used across multiple features.

```
shared/
├── components/            # Shared UI components
│   ├── Button/            # Button component
│   │   ├── Button.tsx     # Button implementation
│   │   ├── Button.test.tsx # Button tests
│   │   └── index.ts       # Button exports
│   ├── Card/              # Card component
│   ├── Form/              # Form components
│   ├── Layout/            # Layout components
│   └── index.ts           # Exports all shared components
├── hooks/                 # Shared custom hooks
│   ├── useForm.ts         # Form hook
│   ├── usePagination.ts   # Pagination hook
│   ├── useSort.ts         # Sorting hook
│   └── index.ts           # Exports all shared hooks
├── services/              # Shared services
│   ├── api/               # API service
│   ├── auth/              # Authentication service
│   └── index.ts           # Exports all shared services
├── utils/                 # Shared utilities
│   ├── date.ts            # Date utilities
│   ├── formatting.ts      # Formatting utilities
│   ├── validation.ts      # Validation utilities
│   └── index.ts           # Exports all shared utilities
└── index.ts               # Exports all shared items
```

## App Directory

The `app` directory contains the application shell, including layout, navigation, and routing.

```
app/
├── layout/                # Application layout components
│   ├── AppLayout.tsx      # Main application layout
│   ├── Header.tsx         # Application header
│   ├── Sidebar.tsx        # Application sidebar
│   ├── Footer.tsx         # Application footer
│   └── index.ts           # Exports all layout components
├── navigation/            # Navigation components
│   ├── MainNav.tsx        # Main navigation
│   ├── Breadcrumbs.tsx    # Breadcrumbs component
│   ├── NavItem.tsx        # Navigation item component
│   └── index.ts           # Exports all navigation components
├── routes.tsx             # Route definitions
├── App.tsx                # Main App component
└── index.ts               # Exports App component
```

## Integration Between Folders

### Layout and State Integration

Layout components should receive state and actions as props from their parent components, which use the state hooks:

```tsx
// FeaturePage.tsx
import React from 'react';
import { FeatureLayout } from '../layout';
import { FeatureList } from '../components';
import { useFeatureState } from '../state';

export const FeaturePage: React.FC = () => {
  const { items, isLoading, error, loadItems } = useFeatureState();

  React.useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <FeatureLayout>
      <FeatureList 
        items={items}
        isLoading={isLoading}
        error={error}
      />
    </FeatureLayout>
  );
};
```

### State and Data Integration

State management should use the data layer to fetch and manipulate data:

```tsx
// featureActions.ts
import { featureRepository } from '../data/repositories/featureRepository';
import type { FeatureAction, FeatureItem } from '../types';

export const loadFeatureItems = (): FeatureAction => async (dispatch) => {
  dispatch({ type: 'LOAD_ITEMS_START' });

  try {
    const items = await featureRepository.getItems();
    dispatch({ type: 'LOAD_ITEMS_SUCCESS', payload: items });
  } catch (error) {
    dispatch({ type: 'LOAD_ITEMS_ERROR', payload: error.message });
  }
};

export const addFeatureItem = (item: Omit<FeatureItem, 'id'>): FeatureAction => async (dispatch) => {
  dispatch({ type: 'ADD_ITEM_START' });

  try {
    const newItem = await featureRepository.createItem(item);
    dispatch({ type: 'ADD_ITEM_SUCCESS', payload: newItem });
  } catch (error) {
    dispatch({ type: 'ADD_ITEM_ERROR', payload: error.message });
  }
};
```

## Conclusion

This detailed folder structure provides a clear organization for the Enhanced Feature-First Architecture, with specific guidance on what should be included in each folder. By following these guidelines, you can create a maintainable and scalable codebase that is easy to understand and extend.

Remember that this structure is a guideline and can be adapted to the specific needs of your project. The most important principle is to maintain clear boundaries between features and ensure that each feature is self-contained with its own components, state management, and data access.
