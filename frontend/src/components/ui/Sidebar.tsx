import { NavLink, useNavigate } from 'react-router-dom';
import { Home, FileText, User, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/auth';
import { logout as logoutApi } from '../../APIs/auth';
import { ROLES } from '../../constants/roles';
import RoleChip from './RoleChip';

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
      <div className="h-20 flex items-center px-7 border-b border-(--color-border) gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <Shield size={20} />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight text-(--color-text)">ABHAY</span>
          <p className="text-[10px] font-medium text-(--color-text-muted) uppercase tracking-widest -mt-0.5">Helpdesk</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 flex flex-col gap-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-(--color-text-muted) uppercase tracking-widest px-3 mb-3">Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-(--color-primary)/10 to-(--color-accent)/10 text-(--color-primary) shadow-sm'
                  : 'text-(--color-text-muted) hover:bg-(--color-bg-hover) hover:text-(--color-text)'
              }`
            }
          >
            <item.icon size={18} className="transition-transform group-hover:scale-110" />
            {item.label}
          </NavLink>
        ))}

        {user?.role === ROLES.ADMIN && (
          <>
            <div className="h-px bg-(--color-border) my-3 mx-3"></div>
            <p className="text-[10px] font-bold text-(--color-text-muted) uppercase tracking-widest px-3 mb-3">Admin</p>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-(--color-primary)/10 to-(--color-accent)/10 text-(--color-primary) shadow-sm'
                    : 'text-(--color-text-muted) hover:bg-(--color-bg-hover) hover:text-(--color-text)'
                }`
              }
            >
              <Shield size={18} className="transition-transform group-hover:scale-110" />
              Admin Panel
            </NavLink>
          </>
        )}
      </nav>

      {/* User section */}
      <div className="border-t border-(--color-border) p-4">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-(--color-bg-muted)">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-indigo-500/20">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-(--color-text) truncate">{user?.name}</p>
            <RoleChip role={user?.role || 'USER'} />
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-(--color-text-muted) hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-(--color-destructive) transition-all duration-200 cursor-pointer mt-2"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
