import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500';

    const variants: Record<string, string> = {
      default:
        'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.45),inset_0_1px_0_rgba(255,255,255,0.2)] hover:brightness-110',
      outline:
        'border-2 border-black/10 dark:border-white/10 hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10',
      ghost:
        'hover:bg-black/5 dark:hover:bg-white/5',
      destructive:
        'bg-gradient-to-b from-red-500 to-red-600 text-white shadow-[0_2px_8px_rgba(239,68,68,0.3)] hover:shadow-[0_4px_16px_rgba(239,68,68,0.4)] hover:brightness-110',
    };

    const sizes: Record<string, string> = {
      sm: 'h-9 px-4 text-xs rounded-lg',
      md: 'h-11 px-6 text-sm rounded-xl',
      lg: 'h-13 px-8 text-base rounded-xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(base, variants[variant], sizes[size], className)}
        style={{
          color: variant === 'ghost' ? 'var(--color-text-muted)' : undefined,
        }}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
export default Button;
