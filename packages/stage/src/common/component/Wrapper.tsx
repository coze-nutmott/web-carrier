import { HTMLAttributes, ReactHTML } from 'react';
import { Row } from 'common/component/Flex';

interface IProps extends HTMLAttributes<HTMLElement> {
  as?: keyof ReactHTML;
  variant?: 'desktopOnly';
}
export default function Wrapper({
  as = 'div',
  variant,
  className,
  ...props
}: IProps) {
  return (
    <Row
      as={as}
      className={cn(
        'flex-row max-w-default mx-auto desktop:px-24',
        { 'px-18': variant !== 'desktopOnly' },
        className,
      )}
      {...props}
    />
  );
}
