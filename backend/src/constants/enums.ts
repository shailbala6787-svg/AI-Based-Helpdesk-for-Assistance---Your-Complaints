export const OTP_PURPOSES = {
  SIGNUP: 'signup',
  RESET: 'reset',
} as const;

export type OtpPurpose = (typeof OTP_PURPOSES)[keyof typeof OTP_PURPOSES];

export const OTP_TTL_MINUTES = 5;
export const OTP_LENGTH = 6;
export const BCRYPT_COST = 12;
export const JWT_EXPIRY = '1d';
export const TITLE_MAX_LENGTH = 12;
