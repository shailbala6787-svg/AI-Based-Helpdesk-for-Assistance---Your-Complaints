import type { Role } from '../../../constants/roles.js';
export declare function listService(userId: number, role: Role): Promise<{
    id: number;
    userId: number;
    title: string;
    complainantName: string;
    complainantContact: string;
    incidentDatetime: Date;
    incidentPlace: string;
    accusedDetails: string | null;
    description: string;
    ipcSections: string[];
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
//# sourceMappingURL=list.d.ts.map