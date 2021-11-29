import Ellipsis from 'common/component/Ellipsis';
import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export default function Nickname({ children, className, ...props }: IProps) {
  return (
    <div
      className={cn('flex text-gray30 text-12 font-medium', className)}
      {...props}
    >
      <Ellipsis>{children}</Ellipsis>
    </div>
  );
}
