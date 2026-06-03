import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={id}
            className="text-[13px] font-semibold tracking-wide uppercase"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'min-h-[120px] w-full rounded-xl border px-4 py-3 text-sm resize-y',
            'placeholder:opacity-50',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-400 focus:ring-red-400/40'
              : 'border-black/10 dark:border-white/10 focus:ring-indigo-500/40 focus:border-indigo-500 hover:border-indigo-400/30',
            className,
          )}
          style={{
            backgroundColor: 'var(--color-bg-input)',
            color: 'var(--color-text)',
          }}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
export default TextArea;
