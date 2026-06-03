import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp as verifyOtpApi, resendOtp as resendOtpApi } from '../APIs/auth';
import { useToast } from '../components/ui/Toast';
import Input from '../components/form/Input';
import Button from '../components/form/Button';
import logoImg from '../assets/logo.png';

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

      <div className="w-full max-w-md relative z-10 fade-in">
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '96px',
              height: '96px',
              borderRadius: '24px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
              marginBottom: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            <img src={logoImg} alt="UP Police" style={{ width: '68px', height: '68px', objectFit: 'contain' }} />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Verify Email</h1>
          <p className="text-white/70 text-base" style={{ marginTop: '8px' }}>
            Enter the 6-digit code sent to your inbox
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-3xl" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
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

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? 'Verifying...' : 'Verify Email'}
          </Button>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full text-center text-sm font-medium hover:text-indigo-500 transition-colors cursor-pointer disabled:opacity-50"
            style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none' }}
          >
            {resending ? 'Sending...' : "Didn't receive a code? Resend"}
          </button>
        </form>
      </div>
    </div>
  );
}
