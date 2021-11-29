import Flex from 'common/component/Flex';
import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  required?: boolean;
}

export default function Label({
  required = false,
  children,
  ...props
}: IProps) {
  return (
    <Flex as="label" {...props}>
      {children}
      {required && (
        <div className="w-4 h-4 mb-auto mt-2 ml-2 rounded-2 bg-yellow" />
      )}
    </Flex>
  );
}
