import type { Role } from '../../../constants/roles.js';
import type { UpdateComplaintDto } from '../dtos/update.js';
export declare function updateService(complaintId: number, userId: number, role: Role, data: UpdateComplaintDto): Promise<{
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
}>;
//# sourceMappingURL=update.d.ts.map