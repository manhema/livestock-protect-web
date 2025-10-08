# Remove Pages from Architecture

## Status

Proposed

## Context

The Livestock Protect UI application currently uses a page-based approach where each route maps to a specific page component located in the `pages` directory. This approach has several limitations:

1. It encourages organizing code by technical concerns rather than by domain/feature
2. It can lead to large, monolithic page components that are difficult to maintain
3. It makes it harder to reuse components across different parts of the application
4. It can create artificial boundaries that don't align with the natural boundaries of the domain

As we move towards implementing the Enhanced Feature-First Architecture, we need to decide how to handle the current page-based organization.

## Decision Drivers

* Need for better organization of code by domain/feature
* Desire to improve component reusability
* Goal to make the codebase more maintainable
* Need to align the code organization with the Enhanced Feature-First Architecture
* Requirement to support complex UI interactions within features

## Considered Options

* **Option 1: Keep pages as a separate concept**
  Continue with pages as a separate concept, but organize them better within the feature structure.

* **Option 2: Remove pages and use feature components directly**
  Remove the concept of pages entirely and use feature components directly in routes.

* **Option 3: Transform pages into feature views**
  Keep the concept of pages but rename them to "views" and place them within feature modules.

## Decision

Chosen option: "Option 2: Remove pages and use feature components directly", because:

1. It aligns perfectly with the Enhanced Feature-First Architecture
2. It removes an unnecessary layer of abstraction
3. It encourages organizing code by domain/feature rather than by technical concerns
4. It makes it easier to reuse components within features
5. It simplifies the mental model for developers

## Consequences

### Positive

* Better organization of code by domain/feature
* Improved component reusability within features
* More maintainable codebase with clearer boundaries
* Simplified mental model for developers
* Better alignment with the Enhanced Feature-First Architecture

### Negative

* Requires significant refactoring of existing code
* May require changes to routing configuration
* Could temporarily disrupt development workflow during transition

### Neutral

* Will require updating documentation to reflect the new approach
* May require additional training for developers unfamiliar with feature-based architecture

## Implementation

The implementation will involve:

1. Creating a `features` directory at the root level of the `src` directory
2. Identifying the main features of the application
3. Creating feature modules for each identified feature
4. Migrating page components to feature components
5. Refactoring routing to use feature components directly
6. Moving feature-specific logic to the appropriate locations within feature modules
7. Extracting shared components to the `shared/components` directory
8. Updating import statements throughout the codebase
9. Removing the `pages` directory once all page components have been migrated

A detailed implementation guide is provided in the [Refactoring from Pages to Features](../refactoring-from-pages-to-features.md) document.

## Related Documents

* [Architecture Options](../architecture-options.md)
* [Code Organization and Documentation](../code-organization-and-documentation.md)
* [Implementation Guide](../implementation-guide.md)
* [Refactoring from Pages to Features](../refactoring-from-pages-to-features.md)
* [Adopt Enhanced Feature-First Architecture](./0001-adopt-feature-first-architecture.md)

## Notes

This decision is part of the broader adoption of the Enhanced Feature-First Architecture. It should be implemented incrementally, one feature at a time, to minimize disruption to the development process.
