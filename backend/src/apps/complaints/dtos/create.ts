import { z } from 'zod';

export const createComplaintDto = z.object({
  title: z.string().min(1).max(12, 'Title must be ≤12 characters'),
  complainantName: z.string().min(1, 'Complainant name is required'),
  complainantContact: z.string().min(1, 'Complainant contact is required'),
  incidentDatetime: z.string().min(1, 'Incident date/time is required'),
  incidentPlace: z.string().min(1, 'Incident place is required'),
  accusedDetails: z.string().optional().default(''),
  description: z.string().min(1, 'Description is required'),
  ipcSections: z.array(z.string()).min(1, 'At least one IPC section is required'),
  imageUrl: z.string().url('Invalid image URL'),
});

export type CreateComplaintDto = z.infer<typeof createComplaintDto>;
