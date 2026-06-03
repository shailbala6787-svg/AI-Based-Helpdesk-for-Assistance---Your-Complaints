import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword as forgotApi, resetPassword as resetApi } from '../APIs/auth';
import { useToast } from '../components/ui/Toast';
import Input from '../components/form/Input';
import Button from '../components/form/Button';
import logoImg from '../assets/logo.png';

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotApi(email);
      toast('Reset code sent to your email', 'success');
      setStep('reset');
    } catch (err: any) {
      toast(err.response?.data?.message || 'Failed to send reset code', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetApi({ email, otp, newPassword });
      toast('Password reset successful', 'success');
      navigate('/login');
    } catch (err: any) {
      toast(err.response?.data?.message || 'Reset failed', 'error');
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl font-bold text-white tracking-tight">
            {step === 'email' ? 'Reset Password' : 'New Password'}
          </h1>
          <p className="text-white/70 text-base" style={{ marginTop: '8px' }}>
            {step === 'email' ? "We'll send a reset code to your email" : 'Enter your code and new password'}
          </p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="glass-card rounded-3xl" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Input
              id="forgot-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? 'Sending...' : 'Send Reset Code'}
            </Button>
            <p className="text-center text-sm">
              <Link to="/login" className="text-indigo-500 font-semibold hover:underline underline-offset-4">
                ← Back to login
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleReset} className="glass-card rounded-3xl" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Input
              id="reset-otp"
              label="Reset Code"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="text-center text-2xl tracking-[0.5em] font-bold"
              required
            />
            <Input
              id="reset-password"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 8 characters"
              minLength={8}
              required
            />
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
