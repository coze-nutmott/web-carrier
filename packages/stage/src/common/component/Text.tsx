import Clamp from 'common/component/Clamp';
import { HTMLProps } from 'react';

interface IProps extends HTMLProps<HTMLElement> {
  as?: string;
  className?: string;
  lines?: number | number[];
}

export default function Text({ className, ...props }: IProps) {
  return (
    <Clamp
      className={cn('text-grayFont text-12 font-medium', className)}
      {...props}
    />
  );
}
