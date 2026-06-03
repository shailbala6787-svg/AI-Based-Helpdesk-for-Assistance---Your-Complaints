import api from '../lib/axios';
import { ENDPOINTS } from '../constants/endpoints';

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  uploadLimit: number;
  searchLimit: number;
  uploadsUsed: number;
  searchesUsed: number;
  createdAt: string;
  updatedAt: string;
}

export async function signup(data: SignupData) {
  const res = await api.post(ENDPOINTS.AUTH.SIGNUP, data);
  return res.data;
}

export async function verifyOtp(data: VerifyOtpData) {
  const res = await api.post(ENDPOINTS.AUTH.VERIFY_OTP, data);
  return res.data;
}

export async function resendOtp(email: string) {
  const res = await api.post(ENDPOINTS.AUTH.RESEND_OTP, { email });
  return res.data;
}

export async function login(data: LoginData) {
  const res = await api.post(ENDPOINTS.AUTH.LOGIN, data);
  return res.data;
}

export async function logout() {
  const res = await api.post(ENDPOINTS.AUTH.LOGOUT);
  return res.data;
}

export async function forgotPassword(email: string) {
  const res = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  return res.data;
}

export async function resetPassword(data: ResetPasswordData) {
  const res = await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
  return res.data;
}

export async function getMe(): Promise<{ data: User }> {
  const res = await api.get(ENDPOINTS.AUTH.ME);
  return res.data;
}
