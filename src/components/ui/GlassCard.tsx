import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
  hover?: boolean;
  gradient?: boolean;
  children: React.ReactNode;
  className?: string;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = true, gradient = false, children }, ref) => {
    const baseClasses = cn(
      'glass-card',
      gradient && 'glass-gradient',
      className
    );

    if (hover) {
      return (
        <motion.div
          ref={ref}
          className={baseClasses}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseClasses}>
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
