import { useAuth } from '../context/auth';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  const stats = [
    { label: 'Uploads Used', value: `${user.uploadsUsed} / ${user.uploadLimit}`, pct: (user.uploadsUsed / user.uploadLimit) * 100 },
    { label: 'AI Searches Used', value: `${user.searchesUsed} / ${user.searchLimit}`, pct: (user.searchesUsed / user.searchLimit) * 100 },
  ];

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)', marginBottom: '32px' }}>Profile</h1>

      <div className="glass-card shadow-premium" style={{ borderRadius: '24px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-64px', right: '-64px', width: '192px', height: '192px', background: 'linear-gradient(225deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))', borderRadius: '50%', filter: 'blur(48px)', pointerEvents: 'none' }} />

        {/* Avatar + info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 10 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/25">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{user.name}</h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{user.email}</p>
          </div>
        </div>

        {/* Info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '24px 0', margin: '24px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', position: 'relative', zIndex: 10 }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Role</p>
            <p style={{ marginTop: '4px' }}>
              <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" style={{ padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>
                {user.role}
              </span>
            </p>
          </div>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</p>
            <p className="text-sm font-bold flex items-center gap-1.5" style={{ marginTop: '4px' }}>
              {user.verified ? (
                <><CheckCircle size={14} className="text-emerald-500" /> <span className="text-emerald-500">Verified</span></>
              ) : (
                <><XCircle size={14} className="text-red-500" /> <span className="text-red-500">Unverified</span></>
              )}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Member Since</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text)', marginTop: '4px' }}>
              {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Quota bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 10 }}>
          <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Usage</p>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{s.label}</span>
                <span className="text-xs font-mono font-bold text-indigo-500">{s.value}</span>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--color-bg-muted)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600"
                  style={{ height: '100%', width: `${Math.min(s.pct, 100)}%`, borderRadius: '9999px', transition: 'width 0.7s ease-out' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
