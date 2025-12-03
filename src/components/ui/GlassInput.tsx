import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <motion.div
        className="relative"
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.15 }}
      >
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-glass-muted">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-xl border border-glass-border bg-white/5 px-4 py-2 text-sm text-glass-text placeholder:text-glass-muted',
            'backdrop-blur-md transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-mint/30 focus:border-mint/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-10',
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

export { GlassInput };
