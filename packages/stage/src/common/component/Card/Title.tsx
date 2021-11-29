import Ellipsis from 'common/component/Ellipsis';
import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLHeadingElement> {}

export default function Title({ children, className }: IProps) {
  return (
    <h2 className={cn('items-center text-14 font-medium', className)}>
      <Ellipsis>{children}</Ellipsis>
    </h2>
  );
}
