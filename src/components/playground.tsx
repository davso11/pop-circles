import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type PlaygroundProps = React.ComponentProps<'div'>;

export const Playground = forwardRef<HTMLDivElement, PlaygroundProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative h-screen', className)}
        {...props}
      />
    );
  },
);
