import { z } from 'zod';

export const UserModel = z.object({
  id: z.string(),
});

export type UserModel = z.infer<typeof UserModel>;
