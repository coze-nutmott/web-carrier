import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLSpanElement> {}

export default function Divider({ className, style }: IProps) {
  return (
    <span className={cn('mx-4 text-10', className)} style={style}>
      |
    </span>
  );
}
