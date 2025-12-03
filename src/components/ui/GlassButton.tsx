import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const glassButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 focus-visible:ring-offset-2 focus-visible:ring-offset-glass-bg disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-mint text-glass-bg hover:bg-mint/90 shadow-lg shadow-mint/20',
        accent:
          'bg-violet text-white hover:bg-violet/90 shadow-lg shadow-violet/20',
        outline:
          'glass-card border-glass-border hover:bg-white/10 text-glass-text',
        ghost:
          'hover:bg-white/10 text-glass-text',
        destructive:
          'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-4 py-1.5 text-xs',
        lg: 'h-12 px-8 py-3',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface GlassButtonProps
  extends VariantProps<typeof glassButtonVariants> {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, children, disabled, onClick, type = 'button' }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(glassButtonVariants({ variant, size, className }))}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export { GlassButton, glassButtonVariants };
