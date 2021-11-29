import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export default function Ellipsis({ children }: IProps) {
  return (
    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap after:inline-block after:w-0">
      {children}
    </div>
  );
}
