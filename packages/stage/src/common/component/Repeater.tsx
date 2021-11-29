import { ReactNode } from 'react';

interface IProps {
  length: number;
  children?: ReactNode;
}
export default function Repeater({ length, children }: IProps) {
  const range = Array(length).fill(null);
  return <>{range.map(() => children)}</>;
}
