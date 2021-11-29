import { HTMLAttributes, ReactHTML } from 'react';
import { Row } from 'common/component/Flex';

interface IProps extends HTMLAttributes<HTMLElement> {
  as?: keyof ReactHTML;
  variants?: 'desktopOnly';
}
export default function Wrapper({
  as = 'div',
  variants,
  className,
  ...props
}: IProps) {
  return (
    <Row
      as={as}
      className={cn(
        'mx-auto desktop:px-24',
        { 'px-18': variants !== 'desktopOnly' },
        className,
      )}
      {...props}
    />
  );
}
