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
      {/* Floating orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo + Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-white/70 mt-2 text-base">Sign in to access your ABHAY dashboard</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-6">
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

          <Button type="submit" disabled={loading} className="w-full h-13 text-base rounded-2xl">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="flex items-center justify-between text-sm pt-1">
            <Link to="/forgot-password" className="text-(--color-primary) font-medium hover:underline underline-offset-4">
              Forgot password?
            </Link>
            <Link to="/signup" className="text-(--color-text-muted) hover:text-(--color-text) font-medium">
              Create account →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
