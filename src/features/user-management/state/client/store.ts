import { create } from 'zustand';
import type { OrganizationModel } from '../../services/models/organization-model.ts';
import type { UserModel } from '../../services/models/user-model.ts';

export interface OrganizationStore {
  organizationId?: string;
  organizations: OrganizationModel[];
  user?: UserModel;

  setOrganizationId: (organizationId: string) => void;
  setOrganizations: (organizations: OrganizationModel[]) => void;
  setUser: (user: UserModel) => void;
}

export const useOrganizationStore = create<OrganizationStore>()((set) => ({
  organizations: [], // Store organizations here
  setOrganizationId: (organizationId: string) => set({ organizationId }),
  setOrganizations: (organizations: OrganizationModel[]) => set({ organizations }),
  setUser: (user: UserModel) => set({ user }),
}));
