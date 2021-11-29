import { HTMLProps } from 'react';
import Gradient from 'common/component/Skeleton/Gradient';

interface IProps extends HTMLProps<HTMLDivElement> {
  animated?: boolean;
}
export default function Item({ animated = true, className, ...props }: IProps) {
  return (
    <div
      className={cn(
        'h-16 relative rounded-3 bg-divideArea overflow-hidden',
        className,
      )}
      {...props}
    >
      {animated && <Gradient />}
    </div>
  );
}
