import { useState, type FormEvent } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SearchBoxProps {
  onSearch: (query: string, aiEnabled: boolean) => void;
  loading?: boolean;
  showAiToggle?: boolean;
}

export default function SearchBox({ onSearch, loading, showAiToggle = true }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [aiEnabled, setAiEnabled] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), aiEnabled);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search complaints..."
          className="h-10 w-full rounded-(--radius-md) border border-(--color-border-input) bg-(--color-bg-input) pl-9 pr-3 text-sm text-(--color-text) placeholder:text-(--color-text-muted) focus:outline-none focus:ring-2 focus:ring-(--color-border-focus) focus:ring-offset-1 transition-colors"
        />
      </div>

      {showAiToggle && (
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              checked={aiEnabled}
              onChange={(e) => setAiEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div
              className={cn(
                'w-9 h-5 rounded-full transition-colors duration-200',
                aiEnabled ? 'bg-(--color-primary)' : 'bg-(--color-border)',
              )}
            />
            <div
              className={cn(
                'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200',
                aiEnabled && 'translate-x-4',
              )}
            />
          </div>
          <span className="text-xs font-medium text-(--color-text-muted) whitespace-nowrap">
            AI Search
          </span>
        </label>
      )}

      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="h-10 px-4 rounded-(--radius-md) bg-(--color-primary) text-(--color-primary-fg) text-sm font-medium hover:bg-(--color-primary-hover) disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
