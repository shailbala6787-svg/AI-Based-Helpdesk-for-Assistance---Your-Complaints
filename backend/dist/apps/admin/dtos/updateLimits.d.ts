import { z } from 'zod';
export declare const updateLimitsDto: z.ZodEffects<z.ZodObject<{
    uploadLimit: z.ZodOptional<z.ZodNumber>;
    searchLimit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    uploadLimit?: number | undefined;
    searchLimit?: number | undefined;
}, {
    uploadLimit?: number | undefined;
    searchLimit?: number | undefined;
}>, {
    uploadLimit?: number | undefined;
    searchLimit?: number | undefined;
}, {
    uploadLimit?: number | undefined;
    searchLimit?: number | undefined;
}>;
export type UpdateLimitsDto = z.infer<typeof updateLimitsDto>;
//# sourceMappingURL=updateLimits.d.ts.map