import { cn } from '@/lib/utils';
import { Coordinate } from '@/types';

type CircleProps = React.ComponentPropsWithoutRef<'div'> & Coordinate;

export const Circle = ({ x, y, className, style, ...props }: CircleProps) => {
  return (
    <div
      {...props}
      className={cn('absolute h-16 w-16 rounded-full bg-primary', className)}
      style={{
        top: y,
        left: x,
        transform: 'translate(-50%, -50%)',
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
};
