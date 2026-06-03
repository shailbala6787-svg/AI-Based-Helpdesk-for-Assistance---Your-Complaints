import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)';

    const variants: Record<string, string> = {
      default:
        'bg-gradient-to-b from-(--color-primary) to-(--color-primary-hover) text-(--color-primary-fg) shadow-[0_2px_8px_rgba(99,102,241,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.45),inset_0_1px_0_rgba(255,255,255,0.2)] hover:brightness-110',
      outline:
        'border-2 border-(--color-border-input) text-(--color-text) hover:border-(--color-primary) hover:text-(--color-primary) hover:bg-(--color-bg-hover)',
      ghost:
        'text-(--color-text-muted) hover:bg-(--color-bg-hover) hover:text-(--color-text)',
      destructive:
        'bg-gradient-to-b from-(--color-destructive) to-(--color-destructive-hover) text-white shadow-[0_2px_8px_rgba(239,68,68,0.3)] hover:shadow-[0_4px_16px_rgba(239,68,68,0.4)] hover:brightness-110',
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
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
export default Button;
