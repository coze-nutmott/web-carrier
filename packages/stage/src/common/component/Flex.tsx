import { createElement, HTMLProps } from 'react';

interface IProps extends HTMLProps<HTMLElement> {
  as?: string;
}
export default function Flex({
  as = 'div',
  className,
  children,
  ...props
}: IProps) {
  return createElement(
    as,
    { className: cn('flex', className), ...props },
    children,
  );
}

export const Row = ({ className, ...props }: IProps) => (
  <Flex className={cn('flex-wrap', className)} {...props} />
);

export const Column = ({ className, ...props }: IProps) => (
  <Flex className={cn('flex-col', className)} {...props} />
);
