import type { LoginDto } from '../dtos/login.js';
export declare function loginService(data: LoginDto): Promise<{
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}>;
//# sourceMappingURL=login.d.ts.map