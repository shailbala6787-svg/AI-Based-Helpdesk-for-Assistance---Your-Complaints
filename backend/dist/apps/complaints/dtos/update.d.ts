import { z } from 'zod';
export declare const updateComplaintDto: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    complainantName: z.ZodOptional<z.ZodString>;
    complainantContact: z.ZodOptional<z.ZodString>;
    incidentDatetime: z.ZodOptional<z.ZodString>;
    incidentPlace: z.ZodOptional<z.ZodString>;
    accusedDetails: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    ipcSections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    complainantName?: string | undefined;
    complainantContact?: string | undefined;
    incidentDatetime?: string | undefined;
    incidentPlace?: string | undefined;
    accusedDetails?: string | undefined;
    description?: string | undefined;
    ipcSections?: string[] | undefined;
}, {
    title?: string | undefined;
    complainantName?: string | undefined;
    complainantContact?: string | undefined;
    incidentDatetime?: string | undefined;
    incidentPlace?: string | undefined;
    accusedDetails?: string | undefined;
    description?: string | undefined;
    ipcSections?: string[] | undefined;
}>;
export type UpdateComplaintDto = z.infer<typeof updateComplaintDto>;
//# sourceMappingURL=update.d.ts.map