import useOnClickOutside from 'common/hook/useOnClickOutside';
import { Children, HTMLAttributes, useRef } from 'react';
import Flex, { Column } from 'common/component/Flex';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

/**
 * TODO
 * border color, bg color, text color 설정 (테마 적용 이후로 미뤄둠)
 */

export default function Dropdown({
  children,
  className,
  style,
  onClose,
  ...props
}: IProps) {
  const ref = useRef(null);

  useOnClickOutside(ref, onClose || (() => null));

  return (
    <div
      ref={ref}
      className={cn('z-10 pt-12 pb-0 px-16 border border-solid', className)}
      style={style}
      {...props}
    >
      <Column className="h-full items-start">
        {Children.map(Children.toArray(children).filter(Boolean), child => (
          <Flex className="mb-12 text-15 w-full">{child}</Flex>
        ))}
      </Column>
    </div>
  );
}
