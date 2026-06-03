import { Router } from 'express';
import { signupController } from './controllers/signup.js';
import { verifyOtpController } from './controllers/verifyOtp.js';
import { resendOtpController } from './controllers/resendOtp.js';
import { loginController } from './controllers/login.js';
import { logoutController } from './controllers/logout.js';
import { forgotPasswordController } from './controllers/forgotPassword.js';
import { resetPasswordController } from './controllers/resetPassword.js';
import { meController } from './controllers/me.js';
import { authMiddleware } from '../../middleware/auth.js';

export const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/verify-otp', verifyOtpController);
authRouter.post('/resend-otp', resendOtpController);
authRouter.post('/login', loginController);
authRouter.post('/logout', authMiddleware, logoutController);
authRouter.post('/forgot-password', forgotPasswordController);
authRouter.post('/reset-password', resetPasswordController);
authRouter.get('/me', authMiddleware, meController);
