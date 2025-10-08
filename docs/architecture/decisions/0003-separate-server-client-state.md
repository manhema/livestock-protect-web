# Separate Server State from Client State

## Status

Proposed

## Context

In modern React applications, state management is a critical aspect of the architecture. As applications grow in complexity, managing different types of state becomes increasingly important. Two primary types of state exist in frontend applications:

1. **Server State**: Data that originates from the server, is persisted remotely, and requires synchronization.
2. **Client State**: UI-specific state that is only relevant to the current user session and is managed locally.

The Livestock Protect UI application needs a clear approach to managing these different types of state to ensure maintainability, performance, and developer productivity.

## Decision Drivers

* Need for clear separation of concerns in state management
* Desire to optimize data fetching and caching
* Requirement for maintainable and testable code
* Goal to reduce boilerplate code for common data fetching patterns
* Need to handle complex UI state independently from server data

## Considered Options

* **Option 1: Unified State Management**
  Use a single state management solution (like Redux) for both server and client state.

* **Option 2: Separate State Management**
  Use specialized tools for server state (React Query) and built-in React features for client state.

* **Option 3: Hybrid Approach**
  Use a combination of specialized tools and unified state management based on the specific use case.

## Decision

Chosen option: "Option 2: Separate State Management", because:

1. It aligns with the principle of separation of concerns
2. It leverages specialized tools that are optimized for their specific use cases
3. It reduces boilerplate code for common data fetching patterns
4. It improves performance through automatic caching and background refetching
5. It simplifies the mental model for developers by clearly distinguishing between different types of state

## Consequences

### Positive

* Clearer separation of concerns in state management
* Improved performance through specialized caching and synchronization
* Reduced boilerplate code for data fetching
* Better developer experience with specialized tools
* More maintainable codebase with clear boundaries

### Negative

* Requires learning multiple state management approaches
* May require refactoring existing code that mixes server and client state
* Could lead to inconsistencies if not properly implemented

### Neutral

* Will require updating documentation to reflect the new approach
* May require additional training for developers unfamiliar with React Query

## Implementation

The implementation will involve:

1. Using React Query (TanStack Query) for server state management
2. Using React Context and useReducer for complex client state
3. Using useState for simple client state
4. Organizing state management code within each feature module:

```
features/
├── feature-name/
│   ├── state/
│   │   ├── server/
│   │   │   ├── queries.ts
│   │   │   ├── mutations.ts
│   │   │   └── index.ts
│   │   ├── client/
│   │   │   ├── context.tsx
│   │   │   ├── reducer.ts
│   │   │   ├── actions.ts
│   │   │   └── index.ts
│   │   └── index.ts
```

A detailed implementation guide is provided in the [Server-Client State Separation](../server-client-state-separation.md) document.

## Related Documents

* [Architecture Options](../architecture-options.md)
* [Code Organization and Documentation](../code-organization-and-documentation.md)
* [Folder Structure Details](../folder-structure-details.md)
* [Server-Client State Separation](../server-client-state-separation.md)

## Notes

This decision is part of the broader adoption of the Enhanced Feature-First Architecture. It should be implemented incrementally, feature by feature, to minimize disruption to the development process.
