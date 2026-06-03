export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  COMPLAINTS: {
    PARSE: '/complaints/parse',
    CREATE: '/complaints',
    LIST: '/complaints',
    SEARCH: '/complaints/search',
    BY_ID: (id: number) => `/complaints/${id}`,
  },
  ADMIN: {
    USERS: '/admin/users',
    UPDATE_LIMITS: (id: number) => `/admin/users/${id}/limits`,
  },
} as const;
