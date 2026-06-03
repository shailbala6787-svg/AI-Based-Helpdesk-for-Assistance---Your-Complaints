import { z } from 'zod';
export declare const searchComplaintDto: z.ZodObject<{
    q: z.ZodString;
    ai: z.ZodDefault<z.ZodEnum<["true", "false"]>>;
}, "strip", z.ZodTypeAny, {
    q: string;
    ai: "true" | "false";
}, {
    q: string;
    ai?: "true" | "false" | undefined;
}>;
export type SearchComplaintDto = z.infer<typeof searchComplaintDto>;
//# sourceMappingURL=search.d.ts.map