import { z } from 'zod';

export const OrganizationModel = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
});

export type OrganizationModel = z.infer<typeof OrganizationModel>;
