import Flex from 'common/component/Flex';
import Number from 'common/component/Number';
import { Text } from 'common/component/shared';
import { ReactNode } from 'react';

interface IProps {
  heading: string;
  message?: string;
  totalElements?: number;
  children?: ReactNode;
}

export default function ListHeader({
  heading,
  message,
  totalElements,
  children,
}: IProps) {
  return (
    <div className="border-b-2 border-solid pb-12">
      <Flex className="justify-between items-end text-14">
        <Flex className="items-center">
          <Text as="h2" variant="s22_bold_black">
            {heading}
          </Text>
          {totalElements !== undefined && (
            <Number className="text-20 font-medium text-grayFont ml6">
              ({totalElements})
            </Number>
          )}
          {message && (
            <Text className="ml-16" variant="s14_normal_gray">
              {message}
            </Text>
          )}
        </Flex>
        {children}
      </Flex>
    </div>
  );
}
