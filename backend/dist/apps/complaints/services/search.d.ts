export declare function searchService(userId: number, query: string, ai: boolean): Promise<{
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
//# sourceMappingURL=search.d.ts.map