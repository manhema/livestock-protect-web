# Junie Rules

Junie is a custom code style enforcement tool used in this project to maintain consistent coding standards.

## File Naming Conventions

We use **kebab-case** for file naming in this project. Kebab-case means:
- All lowercase letters
- Words separated by hyphens (dashes)
- No spaces or special characters

### Examples:

✅ **Correct**:
- `use-toggle-selection.ts`
- `feature-component.tsx`
- `api-client.js`

❌ **Incorrect**:
- `useToggleSelection.ts` (camelCase)
- `FeatureComponent.tsx` (PascalCase)
- `api_client.js` (snake_case)

## Configuration

The Junie configuration is defined in `.junie/config.json`. Currently, it enforces kebab-case for the following file types:
- `.ts` (TypeScript)
- `.tsx` (TypeScript JSX)
- `.js` (JavaScript)
- `.jsx` (JavaScript JSX)

## Usage

When creating new files, make sure to follow the kebab-case naming convention. If you're renaming existing files, ensure they comply with this standard.

For example, if you're creating a custom hook called `useToggleSelection`, the file should be named `use-toggle-selection.ts`.