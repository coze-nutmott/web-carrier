import { createElement } from 'react';
import { ReactNode } from 'react';

type IA11yElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
interface IProps {
  as?: IA11yElement;
  children?: ReactNode;
}

export default function A11y({ as = 'h1', children }: IProps) {
  return createElement(as, { className: 'sr-only' }, children);
}
