import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword as forgotApi, resetPassword as resetApi } from '../APIs/auth';
import { useToast } from '../components/ui/Toast';
import Input from '../components/form/Input';
import Button from '../components/form/Button';

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

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            {step === 'email' ? 'Reset Password' : 'New Password'}
          </h1>
          <p className="text-white/70 mt-2 text-base">
            {step === 'email' ? "We'll send a reset code to your email" : 'Enter your code and new password'}
          </p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="glass-card rounded-3xl p-8 space-y-6">
            <Input
              id="forgot-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <Button type="submit" disabled={loading} className="w-full h-13 text-base rounded-2xl">
              {loading ? 'Sending...' : 'Send Reset Code'}
            </Button>
            <p className="text-center text-sm">
              <Link to="/login" className="text-(--color-primary) font-semibold hover:underline underline-offset-4">
                ← Back to login
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleReset} className="glass-card rounded-3xl p-8 space-y-6">
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
            <Button type="submit" disabled={loading} className="w-full h-13 text-base rounded-2xl">
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
