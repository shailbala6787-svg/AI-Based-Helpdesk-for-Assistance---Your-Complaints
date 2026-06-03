import { z } from 'zod';
export declare const createComplaintDto: z.ZodObject<{
    title: z.ZodString;
    complainantName: z.ZodString;
    complainantContact: z.ZodString;
    incidentDatetime: z.ZodString;
    incidentPlace: z.ZodString;
    accusedDetails: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    description: z.ZodString;
    ipcSections: z.ZodArray<z.ZodString, "many">;
    imageUrl: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    complainantName: string;
    complainantContact: string;
    incidentDatetime: string;
    incidentPlace: string;
    accusedDetails: string;
    description: string;
    ipcSections: string[];
    imageUrl: string;
}, {
    title: string;
    complainantName: string;
    complainantContact: string;
    incidentDatetime: string;
    incidentPlace: string;
    description: string;
    ipcSections: string[];
    imageUrl: string;
    accusedDetails?: string | undefined;
}>;
export type CreateComplaintDto = z.infer<typeof createComplaintDto>;
//# sourceMappingURL=create.d.ts.map