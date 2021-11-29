import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLSpanElement> {}

export default function Number({ className, style, children }: IProps) {
  return (
    <span
      className={cn('font-gmarket font-medium leading-normal', className)}
      style={{ paddingTop: '0.2em', ...style }}
    >
      {children}
    </span>
  );
}
