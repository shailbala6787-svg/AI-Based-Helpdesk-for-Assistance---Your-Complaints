export interface ParsedComplaint {
    title: string;
    complainantName: string;
    complainantContact: string;
    incidentDatetime: string;
    incidentPlace: string;
    accusedDetails: string;
    description: string;
    ipcSections: string[];
}
export declare function parseComplaintImage(base64DataUrl: string): Promise<ParsedComplaint>;
export declare function generateEmbedding(text: string): Promise<number[]>;
//# sourceMappingURL=openai.d.ts.map