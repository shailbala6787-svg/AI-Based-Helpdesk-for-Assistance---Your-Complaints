import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp as verifyOtpApi, resendOtp as resendOtpApi } from '../APIs/auth';
import { useToast } from '../components/ui/Toast';
import Input from '../components/form/Input';
import Button from '../components/form/Button';

export default function Verify() {
  const location = useLocation();
  const [email, setEmail] = useState((location.state as any)?.email || '');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOtpApi({ email, otp });
      toast('Email verified successfully. You can now log in', 'success');
      navigate('/login');
    } catch (err: any) {
      toast(err.response?.data?.message || 'Verification failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast('Please enter your email', 'error');
      return;
    }
    setResending(true);
    try {
      await resendOtpApi(email);
      toast('New OTP sent to your email', 'success');
    } catch (err: any) {
      toast(err.response?.data?.message || 'Failed to resend OTP', 'error');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-bg min-h-screen flex items-center justify-center px-4">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Verify Email</h1>
          <p className="text-white/70 mt-2 text-base">Enter the 6-digit code sent to your inbox</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-6">
          <Input
            id="verify-email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            id="verify-otp"
            label="Verification Code"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="000000"
            maxLength={6}
            className="text-center text-2xl tracking-[0.5em] font-bold"
            required
          />

          <Button type="submit" disabled={loading} className="w-full h-13 text-base rounded-2xl">
            {loading ? 'Verifying...' : 'Verify Email'}
          </Button>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full text-center text-sm text-(--color-text-muted) hover:text-(--color-primary) transition-colors cursor-pointer disabled:opacity-50 font-medium"
          >
            {resending ? 'Sending...' : "Didn't receive a code? Resend"}
          </button>
        </form>
      </div>
    </div>
  );
}
