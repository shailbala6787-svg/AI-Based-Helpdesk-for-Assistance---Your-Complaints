export declare const complaintEmbeddingsDAL: {
    upsert(complaintId: number, embedding: number[]): Promise<void>;
    deleteByComplaintId(complaintId: number): Promise<void>;
    semanticSearch(queryEmbedding: number[], limit?: number): Promise<{
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
        distance: number;
    }[]>;
};
//# sourceMappingURL=complaintEmbeddings.d.ts.map