import { useTheme } from '../context/theme';
import { Sun, Moon } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)', marginBottom: '32px' }}>Settings</h1>

      <div className="glass-card shadow-premium" style={{ borderRadius: '24px', padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Appearance</h3>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Toggle between light and dark mode
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2.5 hover:border-indigo-400/30"
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid var(--color-border-input)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: 'transparent',
            }}
          >
            {theme === 'light' ? (
              <>
                <Sun size={18} className="text-amber-500" />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Light</span>
              </>
            ) : (
              <>
                <Moon size={18} className="text-indigo-400" />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
