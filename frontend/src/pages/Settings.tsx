import { useTheme } from '../context/theme';
import { Sun, Moon } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-(--color-text) tracking-tight mb-8">Settings</h1>

      <div className="glass-card shadow-premium rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-(--color-text)">Appearance</h3>
            <p className="text-xs text-(--color-text-muted) mt-1">
              Toggle between light and dark mode
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-(--color-border-input) hover:bg-(--color-bg-hover) hover:border-(--color-primary)/30 transition-all cursor-pointer shadow-sm"
          >
            {theme === 'light' ? (
              <>
                <Sun size={18} className="text-amber-500" />
                <span className="text-sm font-semibold text-(--color-text)">Light</span>
              </>
            ) : (
              <>
                <Moon size={18} className="text-indigo-400" />
                <span className="text-sm font-semibold text-(--color-text)">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
