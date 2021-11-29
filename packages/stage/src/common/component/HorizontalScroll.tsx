import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  space?: number;
}

export default function HorizontalScroll({
  space,
  children,
  className,
}: IProps) {
  return (
    <div
      className={cn(
        'grid',
        'desktop:flex',
        'grid-flow-col',
        'flex-wrap',
        'max-w-full',
        'overflow-x-scroll',
        'overflow-y-hidden',
        'scrolling-touch',
        'desktop:overflow-x-visible',
        'desktop:overflow-y-visible',
        'before:flex-grow-0',
        'after:flex-grow-0',
        `before:w-${space}`,
        `after:w-${space}`,
        'desktop:after:hidden',
        'desktop:before:hidden',
        'auto-cols-max',
        className,
      )}
    >
      {children}
    </div>
  );
}
