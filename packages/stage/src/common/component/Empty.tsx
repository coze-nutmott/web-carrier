import { Column } from 'common/component/Flex';
import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export default function Empty({ children, className, style }: IProps) {
  return (
    <Column
      className={cn('h-full items-center justify-center', className)}
      style={style}
    >
      <Column className="text-14 text-grayFont justify-center items-center text-center">
        {children}
      </Column>
    </Column>
  );
}
