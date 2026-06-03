import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MultiSelectTagsProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  error?: string;
}

export default function MultiSelectTags({
  label,
  value,
  onChange,
  placeholder = 'Type and press Enter...',
  error,
}: MultiSelectTagsProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed]);
      }
      setInput('');
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-(--color-text)">{label}</label>
      )}
      <div
        className={cn(
          'flex flex-wrap gap-1.5 min-h-[40px] w-full rounded-(--radius-md) border bg-(--color-bg-input) px-2 py-1.5 transition-colors',
          error ? 'border-(--color-destructive)' : 'border-(--color-border-input)',
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-(--radius-sm) bg-(--color-bg-muted) border border-(--color-border) px-2 py-0.5 text-xs font-medium text-(--color-text)"
          >
            IPC {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-(--color-text-muted) hover:text-(--color-text) transition-colors cursor-pointer"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[80px] bg-transparent text-sm text-(--color-text) placeholder:text-(--color-text-muted) outline-none border-none"
        />
      </div>
      {error && <p className="text-xs text-(--color-destructive)">{error}</p>}
    </div>
  );
}
