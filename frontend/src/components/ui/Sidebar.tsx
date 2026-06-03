import { NavLink, useNavigate } from 'react-router-dom';
import { Home, FileText, User, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/auth';
import { logout as logoutApi } from '../../APIs/auth';
import { ROLES } from '../../constants/roles';
import RoleChip from './RoleChip';
import logoImg from '../../assets/logo.png';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/complaints', label: 'Complaints', icon: FileText },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // ignore
    }
    setUser(null);
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] sidebar-glass flex flex-col z-40">
      {/* Logo */}
      <div
        style={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          gap: '12px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <img
          src={logoImg}
          alt="UP Police Logo"
          style={{ width: '44px', height: '44px', objectFit: 'contain', flexShrink: 0 }}
        />
        <div>
          <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
            ABHAY
          </span>
          <p
            className="text-[10px] font-medium uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', marginTop: '-2px' }}
          >
            UP Police Helpdesk
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        <p
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: 'var(--color-text-muted)', padding: '0 12px', marginBottom: '8px' }}
        >
          Menu
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `group flex items-center gap-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
              }`
            }
            style={({ isActive }) => ({
              padding: '10px 12px',
              borderRadius: '12px',
              color: isActive ? undefined : 'var(--color-text-muted)',
            })}
          >
            <item.icon size={18} className="transition-transform group-hover:scale-110 shrink-0" />
            {item.label}
          </NavLink>
        ))}

        {user?.role === ROLES.ADMIN && (
          <>
            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '8px 12px' }} />
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-text-muted)', padding: '0 12px', marginBottom: '8px' }}
            >
              Admin
            </p>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `group flex items-center gap-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                }`
              }
              style={({ isActive }) => ({
                padding: '10px 12px',
                borderRadius: '12px',
                color: isActive ? undefined : 'var(--color-text-muted)',
              })}
            >
              <Shield size={18} className="transition-transform group-hover:scale-110 shrink-0" />
              Admin Panel
            </NavLink>
          </>
        )}
      </nav>

      {/* User section */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--color-border)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-bg-muted)',
          }}
        >
          <div
            className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-md"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
              {user?.name}
            </p>
            <RoleChip role={user?.role || 'USER'} />
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500"
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            marginTop: '8px',
            width: '100%',
            transition: 'all 0.2s',
            background: 'none',
            border: 'none',
          }}
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
