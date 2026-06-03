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
      <h1 className="text-2xl font-bold text-(--color-text) tracking-tight mb-8">Profile</h1>

      <div className="glass-card shadow-premium rounded-3xl p-8 space-y-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-bl from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Avatar + info */}
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/25">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-(--color-text)">{user.name}</h2>
            <p className="text-sm text-(--color-text-muted)">{user.email}</p>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-(--color-border) relative z-10">
          <div>
            <p className="text-[10px] font-bold text-(--color-text-muted) uppercase tracking-widest">Role</p>
            <p className="text-sm font-bold text-(--color-text) mt-1">
              <span className="px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs">
                {user.role}
              </span>
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-(--color-text-muted) uppercase tracking-widest">Status</p>
            <p className="text-sm font-bold mt-1 flex items-center gap-1.5">
              {user.verified ? (
                <><CheckCircle size={14} className="text-(--color-success)" /> <span className="text-(--color-success)">Verified</span></>
              ) : (
                <><XCircle size={14} className="text-(--color-destructive)" /> <span className="text-(--color-destructive)">Unverified</span></>
              )}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-(--color-text-muted) uppercase tracking-widest">Member Since</p>
            <p className="text-sm font-semibold text-(--color-text) mt-1">
              {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Quota bars */}
        <div className="space-y-5 relative z-10">
          <h3 className="text-[10px] font-bold text-(--color-text-muted) uppercase tracking-widest">Usage</h3>
          {stats.map((s) => (
            <div key={s.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-(--color-text)">{s.label}</span>
                <span className="text-xs font-mono font-bold text-(--color-primary)">{s.value}</span>
              </div>
              <div className="h-2 bg-(--color-bg-muted) rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(s.pct, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
