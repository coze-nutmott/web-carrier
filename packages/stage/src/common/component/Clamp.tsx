import { createElement, HTMLProps } from 'react';

interface IProps extends HTMLProps<HTMLElement> {
  as?: string;
  className?: string;
  lines?: number | number[];
}

export default function Clamp({
  as = 'div',
  className,
  lines = 2,
  children,
  ...props
}: IProps) {
  const maxHeight = Array.isArray(lines)
    ? lines.map(l => getMaxHeight(l))
    : getMaxHeight(lines);

  return createElement(
    as,
    {
      className: cn('overflow-hidden', className),
      style: { maxHeight },
      ...props,
    },
    children,
  );
}

const BASE_LINE_HEIGHT = 1.5;
const getMaxHeight = (lines: number) =>
  `${(lines * BASE_LINE_HEIGHT).toFixed(1)}em`;
