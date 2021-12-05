import { LabelHTMLAttributes } from 'react';

import Flex from 'common/component/Flex';

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
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
