# Refactoring from Pages to Features

This document provides guidance on refactoring the Livestock Protect UI codebase from a page-based approach to a feature-based approach, aligning with the Enhanced Feature-First Architecture.

## Overview

The current codebase uses a page-based approach where each route maps to a specific page component located in the `pages` directory. We're moving to a feature-based approach where the UI is organized around features rather than pages, with each feature containing its own components, data access, and state management.

## Why Remove Pages?

Moving away from a page-based architecture to a feature-based architecture offers several benefits:

1. **Better organization**: Code is organized by domain/feature rather than by technical concerns
2. **Improved maintainability**: Features are self-contained with clear boundaries
3. **Enhanced reusability**: Components are designed to be reusable within a feature
4. **Easier collaboration**: Teams can work on different features with minimal conflicts
5. **Clearer mental model**: Developers can focus on one feature at a time

## Refactoring Steps

### 1. Create the Features Directory

Create a `features` directory at the root level of the `src` directory:

```
mkdir -p src/features
```

### 2. Identify Features

Identify the main features of the application. Based on the current pages directory, these might include:

- Access Protect
- Contingency Planning
- Operations
- Properties
- Reports
- Home
- Authentication (Login)

### 3. Create Feature Modules

For each identified feature, create a directory in the `features` directory following the feature template structure:

```
features/
├── access-protect/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── index.ts
│   └── README.md
├── contingency-planning/
├── operations/
├── properties/
├── reports/
├── home/
└── auth/
```

### 4. Migrate Page Components to Feature Components

For each page component, migrate it to the corresponding feature's components directory:

1. Create a main component for the feature (e.g., `AccessProtectFeature.tsx`)
2. Move the content from the page component to the feature component
3. Break down the page component into smaller, more focused components
4. Organize these components within the feature's components directory

Example:

```tsx
// Before: src/pages/access-protect/access-protect-page.tsx
export const AccessProtectPage = () => {
  return (
    <div>
      <h1>Access Protect</h1>
      <AccessProtectForm />
      <AccessProtectList />
    </div>
  );
};

// After: src/features/access-protect/components/AccessProtectFeature.tsx
export const AccessProtectFeature = () => {
  return (
    <div>
      <h1>Access Protect</h1>
      <AccessProtectForm />
      <AccessProtectList />
    </div>
  );
};

// After: src/features/access-protect/index.ts
export { AccessProtectFeature } from './components/AccessProtectFeature';
```

### 5. Refactor Routing

Update the routing configuration to use feature components instead of page components:

```tsx
// Before: src/routing/app-routes.tsx
import { AccessProtectPage } from '../pages/access-protect/access-protect-page.tsx';

// ...

<Route index path="/access/protect" element={<AccessProtectPage />} />

// After: src/routing/app-routes.tsx
import { AccessProtectFeature } from '../features/access-protect';

// ...

<Route index path="/access/protect" element={<AccessProtectFeature />} />
```

### 6. Move Feature-Specific Logic

Move feature-specific logic from the page components to the appropriate locations within the feature module:

1. Move data fetching logic to custom hooks in the `hooks` directory
2. Move API calls to services in the `services` directory
3. Move utility functions to the `utils` directory
4. Define types in the `types` directory

### 7. Extract Shared Components

Identify components that are used across multiple features and move them to the `shared/components` directory.

### 8. Update Imports

Update import statements throughout the codebase to reflect the new structure:

```tsx
// Before
import { SomeComponent } from '../../pages/feature-name/some-component';

// After
import { SomeComponent } from '@/features/feature-name';
```

### 9. Remove the Pages Directory

Once all page components have been migrated to feature components, remove the `pages` directory:

```
rm -rf src/pages
```

## Example: Refactoring the Access Protect Feature

### Before

```
src/
├── pages/
│   ├── access-protect/
│   │   ├── access-protect-page.tsx
│   │   ├── components/
│   │   │   ├── AccessProtectForm.tsx
│   │   │   └── AccessProtectList.tsx
```

### After

```
src/
├── features/
│   ├── access-protect/
│   │   ├── components/
│   │   │   ├── AccessProtectFeature.tsx
│   │   │   ├── AccessProtectForm.tsx
│   │   │   ├── AccessProtectList.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useAccessProtectData.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── accessProtectService.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── accessProtectTypes.ts
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── accessProtectUtils.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── README.md
```

## Testing the Refactored Code

After refactoring, ensure that all features work as expected:

1. Run the application locally
2. Navigate to each feature
3. Test all functionality within each feature
4. Fix any issues that arise

## Conclusion

Refactoring from a page-based approach to a feature-based approach is a significant architectural change, but it will result in a more maintainable and scalable codebase. By following the steps outlined in this document, you can successfully migrate your codebase to align with the Enhanced Feature-First Architecture.

Remember that this refactoring can be done incrementally, one feature at a time, to minimize disruption to the development process.
