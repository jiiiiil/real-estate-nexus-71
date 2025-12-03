import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const glassBadgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-glass-text border border-glass-border',
        new: 'bg-blue-400/20 text-blue-400 border border-blue-400/20',
        contacted: 'bg-amber-400/20 text-amber-400 border border-amber-400/20',
        qualified: 'bg-mint/20 text-mint border border-mint/20',
        converted: 'bg-violet/20 text-violet-light border border-violet/20',
        lost: 'bg-red-400/20 text-red-400 border border-red-400/20',
        pending: 'bg-amber-400/20 text-amber-400 border border-amber-400/20',
        confirmed: 'bg-mint/20 text-mint border border-mint/20',
        cancelled: 'bg-red-400/20 text-red-400 border border-red-400/20',
        available: 'bg-mint/20 text-mint border border-mint/20',
        blocked: 'bg-amber-400/20 text-amber-400 border border-amber-400/20',
        booked: 'bg-violet/20 text-violet-light border border-violet/20',
        sold: 'bg-blue-400/20 text-blue-400 border border-blue-400/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface GlassBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof glassBadgeVariants> {}

const GlassBadge = React.forwardRef<HTMLSpanElement, GlassBadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(glassBadgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

GlassBadge.displayName = 'GlassBadge';

export { GlassBadge, glassBadgeVariants };
