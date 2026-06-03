import type { Role } from '../constants/roles.js';
export interface JwtPayload {
    userId: number;
    role: Role;
}
export declare function signToken(payload: JwtPayload): string;
export declare function verifyToken(token: string): JwtPayload;
//# sourceMappingURL=jwt.d.ts.map