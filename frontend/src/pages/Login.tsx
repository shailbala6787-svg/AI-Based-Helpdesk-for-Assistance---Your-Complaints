import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../APIs/auth';
import { useAuth } from '../context/auth';
import { useToast } from '../components/ui/Toast';
import Input from '../components/form/Input';
import Button from '../components/form/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { refetch } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginApi({ email, password });
      await refetch();
      navigate('/');
    } catch (err: any) {
      toast(err.response?.data?.message || 'Login failed', 'error');
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
        {/* Logo + Heading */}
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
            <img src="/logo.png" alt="UP Police" style={{ width: '68px', height: '68px', objectFit: 'contain' }} />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-white/70 text-base" style={{ marginTop: '8px' }}>
            Sign in to access your ABHAY dashboard
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Input
            id="login-email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            id="login-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
            <Link to="/forgot-password" className="text-indigo-500 font-medium hover:underline underline-offset-4">
              Forgot password?
            </Link>
            <Link
              to="/signup"
              className="font-medium hover:text-indigo-500 transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Create account →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
