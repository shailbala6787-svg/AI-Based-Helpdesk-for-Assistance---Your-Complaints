export declare const usersDAL: {
    findByEmail(email: string): Promise<{
        id: number;
        name: string;
        email: string;
        passwordHash: string;
        role: string;
        verified: boolean;
        uploadLimit: number;
        searchLimit: number;
        uploadsUsed: number;
        searchesUsed: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        passwordHash: string;
        role: string;
        verified: boolean;
        uploadLimit: number;
        searchLimit: number;
        uploadsUsed: number;
        searchesUsed: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: {
        name: string;
        email: string;
        passwordHash: string;
    }): Promise<{
        name: string;
        email: string;
        id: number;
        passwordHash: string;
        role: string;
        verified: boolean;
        uploadLimit: number;
        searchLimit: number;
        uploadsUsed: number;
        searchesUsed: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateVerified(id: number, verified: boolean): Promise<void>;
    updatePassword(id: number, passwordHash: string): Promise<void>;
    incrementUploadsUsed(id: number): Promise<void>;
    incrementSearchesUsed(id: number): Promise<void>;
    updateLimits(id: number, data: {
        uploadLimit?: number;
        searchLimit?: number;
    }): Promise<void>;
    searchByQuery(query: string): Promise<{
        id: number;
        name: string;
        email: string;
        passwordHash: string;
        role: string;
        verified: boolean;
        uploadLimit: number;
        searchLimit: number;
        uploadsUsed: number;
        searchesUsed: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
};
//# sourceMappingURL=users.d.ts.map