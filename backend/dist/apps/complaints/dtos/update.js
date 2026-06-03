import { z } from 'zod';
export const updateComplaintDto = z.object({
    title: z.string().min(1).max(12).optional(),
    complainantName: z.string().min(1).optional(),
    complainantContact: z.string().min(1).optional(),
    incidentDatetime: z.string().min(1).optional(),
    incidentPlace: z.string().min(1).optional(),
    accusedDetails: z.string().optional(),
    description: z.string().min(1).optional(),
    ipcSections: z.array(z.string()).min(1).optional(),
});
//# sourceMappingURL=update.js.map