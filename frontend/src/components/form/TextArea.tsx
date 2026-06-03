import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-(--color-text)">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'min-h-[100px] w-full rounded-(--radius-md) border bg-(--color-bg-input) px-3 py-2 text-sm text-(--color-text) placeholder:text-(--color-text-muted) transition-colors duration-150 resize-y',
            'focus:outline-none focus:ring-2 focus:ring-(--color-border-focus) focus:ring-offset-1',
            error
              ? 'border-(--color-destructive)'
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

TextArea.displayName = 'TextArea';
export default TextArea;
