import type { UpdateLimitsDto } from '../dtos/updateLimits.js';
export declare function updateLimitsService(userId: number, data: UpdateLimitsDto): Promise<{
    id: number;
    name: string;
    email: string;
    role: string;
    verified: boolean;
    uploadLimit: number;
    searchLimit: number;
    uploadsUsed: number;
    searchesUsed: number;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=updateLimits.d.ts.map