import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-[13px] font-semibold tracking-wide uppercase text-(--color-text-muted)">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-12 w-full rounded-xl border bg-(--color-bg-input) px-4 text-sm text-(--color-text)',
            'placeholder:text-(--color-text-muted)/60',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-(--color-primary)/40 focus:border-(--color-primary) focus:bg-white dark:focus:bg-(--color-bg-input)',
            'hover:border-(--color-primary)/30',
            error
              ? 'border-(--color-destructive) focus:ring-(--color-destructive)/40'
              : 'border-(--color-border-input)',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-(--color-destructive)">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
