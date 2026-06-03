import { z } from 'zod';

export const searchComplaintDto = z.object({
  q: z.string().min(1, 'Search query is required'),
  ai: z.enum(['true', 'false']).default('false'),
});

export type SearchComplaintDto = z.infer<typeof searchComplaintDto>;
