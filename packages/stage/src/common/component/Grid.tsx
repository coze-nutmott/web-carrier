import Wrapper from 'common/component/Wrapper';
import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export default function Grid({ className, style, ...props }: IProps) {
  return (
    <Wrapper
      className={cn('grid grid-cols-12 gap-x-12', className)}
      style={{ gridTemplateRows: 'auto', ...style }}
      {...props}
    />
  );
}
