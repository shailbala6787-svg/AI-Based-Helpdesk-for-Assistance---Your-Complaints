export declare const OTP_PURPOSES: {
    readonly SIGNUP: "signup";
    readonly RESET: "reset";
};
export type OtpPurpose = (typeof OTP_PURPOSES)[keyof typeof OTP_PURPOSES];
export declare const OTP_TTL_MINUTES = 5;
export declare const OTP_LENGTH = 6;
export declare const BCRYPT_COST = 12;
export declare const JWT_EXPIRY = "1d";
export declare const TITLE_MAX_LENGTH = 12;
//# sourceMappingURL=enums.d.ts.map