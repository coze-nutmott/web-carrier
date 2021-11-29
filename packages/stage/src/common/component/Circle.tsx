import { HTMLAttributes } from 'react';
import Flex from 'common/component/Flex';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export default function Circle({ children, className, ...props }: IProps) {
  return (
    <Flex
      className={cn(
        'w-32 h-32 justify-center items-center rounded-16',
        className,
      )}
      {...props}
    >
      {children}
    </Flex>
  );
}
