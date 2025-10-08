# Feature Composition: Integrating Multiple Features on a Single View

## Overview

This document addresses how multiple features can be composed together on a single view in the Enhanced Feature-First Architecture. While we've moved away from a page-based approach to a feature-based approach, it's important to recognize that a single view or route can incorporate multiple features working together.

## Why Feature Composition Matters

In real-world applications, users often need to interact with multiple related features simultaneously on a single screen. For example:

1. A dashboard might display widgets from multiple features (reports, notifications, user activity)
2. A property details view might show property information alongside biosecurity measures and access controls
3. An operations view might combine scheduling, resource allocation, and task management features

Feature composition allows us to:
- Create rich, integrated user experiences
- Maintain feature independence while enabling collaboration
- Reuse features in different contexts and combinations
- Scale the application by adding new feature combinations

## Composition Patterns

### 1. Container Components

Create container components in the `app` directory that compose multiple features together:

```tsx
// src/app/views/PropertyDetailsView.tsx
import React from 'react';
import { PropertyDetailsFeature } from '@/features/properties';
import { BiosecurityMeasuresFeature } from '@/features/biosecurity';
import { AccessControlFeature } from '@/features/access-protect';

export const PropertyDetailsView: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  return (
    <div className="property-details-view">
      <PropertyDetailsFeature propertyId={propertyId} />
      
      <div className="property-details-secondary">
        <BiosecurityMeasuresFeature propertyId={propertyId} />
        <AccessControlFeature propertyId={propertyId} />
      </div>
    </div>
  );
};
```

### 2. Feature Communication

Features need to communicate with each other when composed together. This can be achieved through:

#### Props Passing

Pass data and callbacks between features through props:

```tsx
// Container component passing data between features
const DashboardView: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  return (
    <div className="dashboard">
      <PropertiesListFeature 
        onPropertySelect={setSelectedProperty} 
      />
      {selectedProperty && (
        <PropertyDetailsFeature 
          property={selectedProperty} 
        />
      )}
    </div>
  );
};
```

#### Shared State

Use a shared state management solution for cross-feature communication:

```tsx
// src/app/state/sharedState.ts
import { create } from 'zustand';

interface SharedState {
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
}

export const useSharedState = create<SharedState>((set) => ({
  selectedPropertyId: null,
  setSelectedPropertyId: (id) => set({ selectedPropertyId: id }),
}));
```

```tsx
// Feature A using shared state
import { useSharedState } from '@/app/state/sharedState';

export const PropertiesListFeature: React.FC = () => {
  const { setSelectedPropertyId } = useSharedState();
  
  return (
    <div>
      {properties.map(property => (
        <PropertyCard 
          key={property.id}
          property={property}
          onClick={() => setSelectedPropertyId(property.id)}
        />
      ))}
    </div>
  );
};
```

```tsx
// Feature B using shared state
import { useSharedState } from '@/app/state/sharedState';

export const PropertyDetailsFeature: React.FC = () => {
  const { selectedPropertyId } = useSharedState();
  
  // Fetch property details using the selectedPropertyId
  
  return (
    <div>
      {/* Property details UI */}
    </div>
  );
};
```

#### Event Bus

For loosely coupled features, use an event bus pattern:

```tsx
// src/core/eventBus.ts
type EventCallback = (data: any) => void;

class EventBus {
  private events: Record<string, EventCallback[]> = {};

  subscribe(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }

  publish(event: string, data: any) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

export const eventBus = new EventBus();
```

```tsx
// Feature A publishing an event
import { eventBus } from '@/core/eventBus';

export const PropertiesListFeature: React.FC = () => {
  return (
    <div>
      {properties.map(property => (
        <PropertyCard 
          key={property.id}
          property={property}
          onClick={() => eventBus.publish('PROPERTY_SELECTED', property.id)}
        />
      ))}
    </div>
  );
};
```

```tsx
// Feature B subscribing to an event
import { eventBus } from '@/core/eventBus';

export const PropertyDetailsFeature: React.FC = () => {
  const [propertyId, setPropertyId] = useState<string | null>(null);
  
  useEffect(() => {
    const unsubscribe = eventBus.subscribe('PROPERTY_SELECTED', (id) => {
      setPropertyId(id);
    });
    
    return unsubscribe;
  }, []);
  
  // Fetch property details using propertyId
  
  return (
    <div>
      {/* Property details UI */}
    </div>
  );
};
```

### 3. Composition Layout Components

Create layout components specifically designed for feature composition:

```tsx
// src/app/layouts/TwoColumnLayout.tsx
import React from 'react';

interface TwoColumnLayoutProps {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  leftWidth?: string;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftColumn,
  rightColumn,
  leftWidth = '30%',
}) => {
  return (
    <div className="two-column-layout" style={{ display: 'flex' }}>
      <div className="left-column" style={{ width: leftWidth }}>
        {leftColumn}
      </div>
      <div className="right-column" style={{ flex: 1 }}>
        {rightColumn}
      </div>
    </div>
  );
};
```

```tsx
// Using the layout for feature composition
import { TwoColumnLayout } from '@/app/layouts/TwoColumnLayout';
import { PropertiesListFeature } from '@/features/properties';
import { PropertyDetailsFeature } from '@/features/properties';

export const PropertiesView: React.FC = () => {
  return (
    <TwoColumnLayout
      leftColumn={<PropertiesListFeature />}
      rightColumn={<PropertyDetailsFeature />}
    />
  );
};
```

## Best Practices for Feature Composition

### 1. Keep Features Independent

Features should be self-contained and not directly depend on other features. This ensures they can be:
- Developed independently
- Tested in isolation
- Reused in different contexts
- Maintained without affecting other features

### 2. Define Clear Interfaces

Each feature should expose a clear public API through its index.ts file:

```tsx
// src/features/properties/index.ts
export { PropertiesListFeature } from './components/PropertiesListFeature';
export { PropertyDetailsFeature } from './components/PropertyDetailsFeature';
export type { Property } from './types/propertyTypes';
```

### 3. Use Composition at the Right Level

- **App Level**: Compose features in container components within the app directory
- **Feature Level**: Keep feature components focused on a single responsibility
- **Shared Level**: Extract truly shared functionality to the shared directory

### 4. Handle Loading and Error States

When composing features, consider how loading and error states should be handled:

```tsx
// Coordinated loading states
const DashboardView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="dashboard">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <FeatureA onLoadingChange={(loading) => setIsLoading(loading)} />
          <FeatureB onLoadingChange={(loading) => setIsLoading(loading)} />
          <FeatureC onLoadingChange={(loading) => setIsLoading(loading)} />
        </>
      )}
    </div>
  );
};
```

### 5. Consider Performance

When composing multiple features on a single view:
- Use React.memo for expensive components
- Implement virtualization for long lists
- Consider lazy loading features that aren't immediately visible
- Use code splitting to reduce initial bundle size

```tsx
// Lazy loading features
import React, { lazy, Suspense } from 'react';

const PropertyDetailsFeature = lazy(() => import('@/features/properties/components/PropertyDetailsFeature'));
const BiosecurityMeasuresFeature = lazy(() => import('@/features/biosecurity/components/BiosecurityMeasuresFeature'));

export const PropertyView: React.FC = () => {
  return (
    <div>
      <PropertyHeader />
      
      <Suspense fallback={<LoadingSpinner />}>
        <PropertyDetailsFeature />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <BiosecurityMeasuresFeature />
      </Suspense>
    </div>
  );
};
```

## Example: Dashboard View with Multiple Features

Here's a complete example of a dashboard view that composes multiple features:

```tsx
// src/app/views/DashboardView.tsx
import React from 'react';
import { TwoColumnLayout } from '@/app/layouts/TwoColumnLayout';
import { DashboardHeader } from '@/app/components/DashboardHeader';
import { PropertiesSummaryFeature } from '@/features/properties';
import { RecentActivityFeature } from '@/features/activity';
import { NotificationsFeature } from '@/features/notifications';
import { QuickActionsFeature } from '@/features/quick-actions';

export const DashboardView: React.FC = () => {
  return (
    <div className="dashboard-view">
      <DashboardHeader title="Livestock Protect Dashboard" />
      
      <div className="dashboard-main">
        <div className="dashboard-top-row">
          <QuickActionsFeature />
          <NotificationsFeature limit={5} />
        </div>
        
        <TwoColumnLayout
          leftColumn={<PropertiesSummaryFeature />}
          rightColumn={<RecentActivityFeature />}
          leftWidth="60%"
        />
      </div>
    </div>
  );
};
```

## Routing with Composed Features

Update the routing configuration to use container components that compose multiple features:

```tsx
// src/app/routes.tsx
import { BrowserRouter, Route, Routes } from 'react-router';
import { DashboardView } from './views/DashboardView';
import { PropertyDetailsView } from './views/PropertyDetailsView';
import { OperationsView } from './views/OperationsView';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/properties/:id" element={<PropertyDetailsView />} />
        <Route path="/operations" element={<OperationsView />} />
      </Routes>
    </BrowserRouter>
  );
};
```

## Conclusion

Feature composition is a powerful approach that allows us to create rich, integrated user experiences while maintaining the benefits of the Enhanced Feature-First Architecture. By following the patterns and best practices outlined in this document, you can effectively compose multiple features on a single view while keeping your codebase maintainable and scalable.

Remember that the goal is to balance feature independence with seamless integration. Features should be self-contained but designed to work together through well-defined interfaces and communication patterns.
