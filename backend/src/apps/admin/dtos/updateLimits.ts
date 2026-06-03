import { z } from 'zod';

export const updateLimitsDto = z
  .object({
    uploadLimit: z.number().int().min(0).optional(),
    searchLimit: z.number().int().min(0).optional(),
  })
  .refine((data) => data.uploadLimit !== undefined || data.searchLimit !== undefined, {
    message: 'At least one of uploadLimit or searchLimit must be provided',
  });

export type UpdateLimitsDto = z.infer<typeof updateLimitsDto>;
