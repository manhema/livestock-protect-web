import { create } from 'zustand';
import type { OrganizationModel } from '../../services/models/organization-model.ts';
import type { UserModel } from '../../services/models/user-model.ts';
import { PolicyInformationModel } from '../../services/models/policy-information-model.ts';

export interface OrganizationStore {
  organizationId?: string;
  organizations: OrganizationModel[];
  user?: UserModel;
  policies?: PolicyInformationModel;

  setOrganizationId: (organizationId: string) => void;
  setOrganizations: (organizations: OrganizationModel[]) => void;
  setUser: (user: UserModel) => void;
  setPolicies: (policies: PolicyInformationModel) => void;
}

export const useOrganizationStore = create<OrganizationStore>()((set) => ({
  organizations: [], // Store organizations here
  setOrganizationId: (organizationId: string) => set({ organizationId }),
  setOrganizations: (organizations: OrganizationModel[]) => set({ organizations }),
  setUser: (user: UserModel) => set({ user }),
  setPolicies: (policies: PolicyInformationModel) => set({ policies }),
}));
