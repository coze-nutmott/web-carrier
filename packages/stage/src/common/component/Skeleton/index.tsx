import Flex, { Column } from 'common/component/Flex';
import Item from 'common/component/Skeleton/Item';
import { HTMLProps } from 'react';

interface IProps extends HTMLProps<HTMLDivElement> {
  thumbnailClassName?: string;
  lines?: number;
  direction?: 'row' | 'column' | 'row-reverse';
}

const WIDTH_PRESET = ['50%', '100%', '70%', '80%', '60%'];

export default function Skeleton({
  thumbnailClassName,
  lines = 1,
  direction = 'row',
  className,
  ...props
}: IProps) {
  const items = WIDTH_PRESET.slice(0, lines);
  const directionClassName =
    direction === 'column' ? 'flex-col' : `flex-${direction}`;

  return (
    <Flex
      className={cn('items-center', directionClassName, className)}
      {...props}
    >
      {thumbnailClassName && (
        <Item className={thumbnailClassName} animated={false} />
      )}
      <Column className="flex-grow w-full">
        {items.map((value, index) => (
          <Item key={index} className="mb-4" style={{ width: value }} />
        ))}
      </Column>
    </Flex>
  );
}
