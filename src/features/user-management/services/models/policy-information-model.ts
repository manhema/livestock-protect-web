import { z } from 'zod';

export const PolicyInformationModel = z.object({
  userId: z.string(),
  organization: z.object({
    organizationId: z.string(),
    name: z.string(),
    role: z.enum(['Admin', 'Member']),
    isOwner: z.boolean(),
    permissions: z.string().array(),
  }),
  properties: z.object({
    propertyId: z.string(),
    role: z.enum(['Editor', 'Viewer']).default('Viewer'),
    name: z.string(),
    seats: z.number(),
    subscription: z.enum(['Free', 'Premium', 'Enterprise']),
    products: z.object({
      key: z.string(),
      name: z.string(),
      permissions: z.string().array(),
    }).array(),
    permissions: z.string().array(),
  }).array(),

});

export type PolicyInformationModel = z.infer<typeof PolicyInformationModel>;

export const ProductPermissionModel = z.object({
  name: z.string(),
  permissions: z.string().array(),
});

export type ProductPermissionModel = z.infer<typeof ProductPermissionModel>;
