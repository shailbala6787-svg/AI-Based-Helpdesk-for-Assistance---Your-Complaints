export declare function searchUsersService(query: string): Promise<{
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
}[]>;
//# sourceMappingURL=searchUsers.d.ts.map