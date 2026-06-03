import { Resend } from 'resend';
import { config } from '../config/env.js';
const resend = new Resend(config.resendApiKey);
export async function sendOtpEmail(to, otp, purpose) {
    const subject = purpose === 'signup'
        ? 'ABHAY — Verify Your Email'
        : 'ABHAY — Reset Your Password';
    const body = purpose === 'signup'
        ? `Your verification code is: <strong>${otp}</strong><br><br>This code expires in 5 minutes.<br><br>If you did not request this, please ignore this email.`
        : `Your password reset code is: <strong>${otp}</strong><br><br>This code expires in 5 minutes.<br><br>If you did not request this, please ignore this email.`;
    const { data, error } = await resend.emails.send({
        from: `ABHAY <${config.emailFrom}>`,
        to,
        subject,
        html: `<div style="font-family: sans-serif; padding: 20px; max-width: 400px;">
      <h2 style="color: #333;">${subject}</h2>
      <p style="color: #555; font-size: 16px; line-height: 1.5;">${body}</p>
    </div>`,
    });
    if (error) {
        console.error('Resend API error:', error);
        throw new Error(`Email sending failed: ${error.message}`);
    }
    return data;
}
//# sourceMappingURL=resend.js.map