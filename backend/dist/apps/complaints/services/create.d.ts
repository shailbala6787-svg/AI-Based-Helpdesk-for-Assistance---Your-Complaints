import type { CreateComplaintDto } from '../dtos/create.js';
export declare function createService(userId: number, data: CreateComplaintDto): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
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
}>;
//# sourceMappingURL=create.d.ts.map