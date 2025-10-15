// shared/utils/portal-context.tsx
import { createContext, useContext } from 'react';

export const MapPortalContext = createContext<HTMLElement | null>(null);
export const useMapPortal = () => useContext(MapPortalContext);
