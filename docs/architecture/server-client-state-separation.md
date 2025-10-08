# Separating Server State from Client State

## Overview

This document provides guidance on separating server state from client state in the Enhanced Feature-First Architecture. It explains the distinction between these two types of state, how to manage them separately, and provides concrete examples of implementation.

## What is Server State vs. Client State?

### Server State

Server state refers to data that:
- Originates from the server
- Is persisted remotely
- Can be updated by multiple users
- Requires asynchronous APIs for CRUD operations
- Needs caching, synchronization, and invalidation
- Examples: user data, content from APIs, database records

### Client State

Client state refers to data that:
- Originates from the client
- Is only relevant to the current user session
- Is not persisted beyond the current session (unless explicitly saved)
- Can be updated synchronously
- Examples: UI state, form input values, selected items, theme preferences

## Architecture for State Separation

In the Enhanced Feature-First Architecture, we recommend the following approach for separating server and client state:

```
features/
├── feature-name/
│   ├── components/        # UI components specific to this feature
│   ├── hooks/             # Custom hooks for this feature
│   ├── services/          # Services for this feature
│   ├── state/             # State management for this feature
│   │   ├── server/        # Server state management
│   │   │   ├── queries.ts # React Query hooks for fetching data
│   │   │   ├── mutations.ts # React Query hooks for modifying data
│   │   │   └── index.ts   # Exports all server state hooks
│   │   ├── client/        # Client state management
│   │   │   ├── context.tsx # React Context for client state
│   │   │   ├── reducer.ts # Reducer for client state
│   │   │   ├── actions.ts # Actions for client state
│   │   │   └── index.ts   # Exports all client state hooks
│   │   └── index.ts       # Exports all state-related items
│   ├── types/             # TypeScript types for this feature
│   ├── utils/             # Utilities specific to this feature
│   ├── index.ts           # Public API for this feature
│   └── README.md          # Feature documentation
```

## Implementation Guidelines

### Server State Management

For server state, we recommend using React Query (TanStack Query) as it provides:
- Automatic caching and invalidation
- Background refetching
- Pagination and infinite scrolling support
- Optimistic updates
- Mutation handling
- Error handling and retry logic

#### Example Implementation

```tsx
// features/products/state/server/queries.ts
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById } from '../../services/productService';
import type { Product } from '../../types';

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['products', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Only run the query if id is provided
  });
};
```

```tsx
// features/products/state/server/mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, updateProduct, deleteProduct } from '../../services/productService';
import type { Product, CreateProductInput, UpdateProductInput } from '../../types';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: (newProduct: Product) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      // Or optimistically update the cache
      queryClient.setQueryData<Product[]>(['products'], (oldProducts = []) => {
        return [...oldProducts, newProduct];
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductInput }) => 
      updateProduct(id, data),
    onSuccess: (updatedProduct: Product) => {
      // Update the product in the cache
      queryClient.setQueryData(['products', updatedProduct.id], updatedProduct);
      
      // Update the product in the products list
      queryClient.setQueryData<Product[]>(['products'], (oldProducts = []) => {
        return oldProducts.map(product => 
          product.id === updatedProduct.id ? updatedProduct : product
        );
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: (_, id) => {
      // Remove the product from the cache
      queryClient.removeQueries({ queryKey: ['products', id] });
      
      // Update the products list
      queryClient.setQueryData<Product[]>(['products'], (oldProducts = []) => {
        return oldProducts.filter(product => product.id !== id);
      });
    },
  });
};
```

### Client State Management

For client state, we recommend using React Context and useReducer for more complex state or useState for simpler state:

#### Example Implementation with Context and useReducer

```tsx
// features/products/state/client/types.ts
import type { Product } from '../../types';

export interface ProductsClientState {
  selectedProductId: string | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    searchQuery: string;
  };
  sortBy: 'name' | 'price' | 'date';
  sortOrder: 'asc' | 'desc';
  view: 'grid' | 'list';
}

export type ProductsAction =
  | { type: 'SELECT_PRODUCT'; payload: string | null }
  | { type: 'SET_FILTER'; payload: { key: keyof ProductsClientState['filters']; value: any } }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_SORT'; payload: { sortBy: ProductsClientState['sortBy']; sortOrder: ProductsClientState['sortOrder'] } }
  | { type: 'TOGGLE_VIEW' };
```

```tsx
// features/products/state/client/reducer.ts
import type { ProductsClientState, ProductsAction } from './types';

export const initialState: ProductsClientState = {
  selectedProductId: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    searchQuery: '',
  },
  sortBy: 'name',
  sortOrder: 'asc',
  view: 'grid',
};

export const productsReducer = (
  state: ProductsClientState,
  action: ProductsAction
): ProductsClientState => {
  switch (action.type) {
    case 'SELECT_PRODUCT':
      return {
        ...state,
        selectedProductId: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
      };
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      };
    case 'TOGGLE_VIEW':
      return {
        ...state,
        view: state.view === 'grid' ? 'list' : 'grid',
      };
    default:
      return state;
  }
};
```

```tsx
// features/products/state/client/context.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { productsReducer, initialState } from './reducer';
import type { ProductsClientState, ProductsAction } from './types';

interface ProductsContextType {
  state: ProductsClientState;
  dispatch: React.Dispatch<ProductsAction>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};
```

```tsx
// features/products/state/client/hooks.ts
import { useProductsContext } from './context';

export const useProductSelection = () => {
  const { state, dispatch } = useProductsContext();
  
  return {
    selectedProductId: state.selectedProductId,
    selectProduct: (id: string | null) => dispatch({ type: 'SELECT_PRODUCT', payload: id }),
  };
};

export const useProductFilters = () => {
  const { state, dispatch } = useProductsContext();
  
  return {
    filters: state.filters,
    setFilter: (key: keyof typeof state.filters, value: any) => 
      dispatch({ type: 'SET_FILTER', payload: { key, value } }),
    resetFilters: () => dispatch({ type: 'RESET_FILTERS' }),
  };
};

export const useProductSort = () => {
  const { state, dispatch } = useProductsContext();
  
  return {
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    setSort: (sortBy: typeof state.sortBy, sortOrder: typeof state.sortOrder) => 
      dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } }),
  };
};

export const useProductView = () => {
  const { state, dispatch } = useProductsContext();
  
  return {
    view: state.view,
    toggleView: () => dispatch({ type: 'TOGGLE_VIEW' }),
  };
};
```

#### Example Implementation with useState for Simpler State

```tsx
// features/products/state/client/hooks.ts
import { useState } from 'react';

export const useProductSelection = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  return {
    selectedProductId,
    selectProduct: setSelectedProductId,
  };
};

export const useProductFilters = () => {
  const [filters, setFilters] = useState({
    category: null,
    minPrice: null,
    maxPrice: null,
    searchQuery: '',
  });
  
  const setFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      category: null,
      minPrice: null,
      maxPrice: null,
      searchQuery: '',
    });
  };
  
  return {
    filters,
    setFilter,
    resetFilters,
  };
};
```

### Integration in Components

Here's how to use both server and client state in components:

```tsx
// features/products/components/ProductsList.tsx
import { useProducts } from '../state/server/queries';
import { useProductFilters, useProductSort, useProductView, useProductSelection } from '../state/client/hooks';

export const ProductsList = () => {
  // Server state
  const { data: products, isLoading, error } = useProducts();
  
  // Client state
  const { filters, setFilter } = useProductFilters();
  const { sortBy, sortOrder, setSort } = useProductSort();
  const { view, toggleView } = useProductView();
  const { selectedProductId, selectProduct } = useProductSelection();
  
  // Filter and sort products
  const filteredProducts = products
    ?.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const factor = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'name') return factor * a.name.localeCompare(b.name);
      if (sortBy === 'price') return factor * (a.price - b.price);
      return factor * (new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {/* Filters UI */}
      <div className="filters">
        <input
          type="text"
          value={filters.searchQuery}
          onChange={e => setFilter('searchQuery', e.target.value)}
          placeholder="Search products..."
        />
        {/* Other filter controls */}
      </div>
      
      {/* Sort and view controls */}
      <div className="controls">
        <select
          value={sortBy}
          onChange={e => setSort(e.target.value as any, sortOrder)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="date">Date</option>
        </select>
        
        <button onClick={() => setSort(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
        
        <button onClick={toggleView}>
          {view === 'grid' ? 'List View' : 'Grid View'}
        </button>
      </div>
      
      {/* Products list */}
      <div className={`products-${view}`}>
        {filteredProducts?.map(product => (
          <div
            key={product.id}
            className={`product ${selectedProductId === product.id ? 'selected' : ''}`}
            onClick={() => selectProduct(product.id)}
          >
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            {/* Other product details */}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Feature Provider Pattern

To simplify the integration of both server and client state, you can create a feature provider that combines both:

```tsx
// features/products/state/ProductsProvider.tsx
import { ReactNode } from 'react';
import { ProductsProvider as ClientStateProvider } from './client/context';

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClientStateProvider>
      {children}
    </ClientStateProvider>
  );
};
```

```tsx
// features/products/components/ProductsFeature.tsx
import { ProductsProvider } from '../state/ProductsProvider';
import { ProductsList } from './ProductsList';
import { ProductDetails } from './ProductDetails';

export const ProductsFeature: React.FC = () => {
  return (
    <ProductsProvider>
      <div className="products-feature">
        <ProductsList />
        <ProductDetails />
      </div>
    </ProductsProvider>
  );
};
```

## Best Practices

1. **Keep server and client state separate**: Don't mix server data with UI state.

2. **Use React Query for server state**: It handles caching, refetching, and synchronization.

3. **Use Context/useReducer for complex client state**: When client state has multiple related values or complex logic.

4. **Use useState for simple client state**: When client state is simple and isolated.

5. **Colocate state with its usage**: Keep state as close as possible to where it's used.

6. **Avoid prop drilling**: Use context or custom hooks to share state without passing props through multiple levels.

7. **Normalize server data**: Store server data in a normalized form to avoid duplication and inconsistencies.

8. **Optimize renders**: Use memoization (useMemo, useCallback, memo) to prevent unnecessary re-renders.

9. **Handle loading and error states**: Always account for loading, error, and empty states in your UI.

10. **Use optimistic updates**: Update the UI immediately on mutations, then revert if the server request fails.

## Conclusion

Separating server state from client state leads to more maintainable, performant, and predictable applications. By using React Query for server state and React's built-in state management for client state, you can create a clean separation of concerns that makes your code easier to understand and maintain.

This approach aligns with the Enhanced Feature-First Architecture by keeping features self-contained while providing clear patterns for managing different types of state within each feature.
