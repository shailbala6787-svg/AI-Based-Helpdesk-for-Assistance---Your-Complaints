import type { OtpPurpose } from '../../constants/enums.js';
export declare const otpsDAL: {
    create(data: {
        userId: number;
        otpHash: string;
        purpose: OtpPurpose;
        expiresAt: Date;
    }): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        otpHash: string;
        purpose: string;
        expiresAt: Date;
    }>;
    findLatestByUserAndPurpose(userId: number, purpose: OtpPurpose): Promise<{
        id: number;
        userId: number;
        otpHash: string;
        purpose: string;
        expiresAt: Date;
        createdAt: Date;
    }>;
    deleteByUserAndPurpose(userId: number, purpose: OtpPurpose): Promise<void>;
};
//# sourceMappingURL=otps.d.ts.map