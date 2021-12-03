import { HTMLAttributes } from 'react';
import styles from 'common/component/HorizontalScroll.module.scss';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  space?: '12px' | '16px' | '24px';
}

export default function HorizontalScroll({
  space,
  children,
  className,
  style,
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
        'desktop:after:hidden',
        'desktop:before:hidden',
        'auto-cols-max',
        space ? styles[`space-${space}`] : '',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
