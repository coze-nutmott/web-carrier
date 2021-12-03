import Flex, { Row } from 'common/component/Flex';
import { Anchor } from 'common/component/shared';
import { HTMLProps } from 'react';
import MoreIcon from '@icons/icons-anchor-bold.svg';

interface IProps extends HTMLProps<HTMLDivElement> {}

export default function SectionHeading({
  href,
  title,
  children,
  className,
  ...props
}: IProps) {
  return (
    <Row className={cn('w-full items-center', className)} {...props}>
      <h2 className="text-18 desktop:text-22 font-bold">{title}</h2>
      {children}
      {href && (
        <Anchor
          as="a"
          display="flex"
          className="items-center ml-auto text-grayFont text-14 font-medium"
        >
          <span className="hidden desktop:inline">더보기</span>
          <Flex className="w-20 h-20 desktop:w-12 desktop:h-12 items-center justify-center text-black desktop:text-gray20">
            <MoreIcon />
          </Flex>
        </Anchor>
      )}
    </Row>
  );
}
