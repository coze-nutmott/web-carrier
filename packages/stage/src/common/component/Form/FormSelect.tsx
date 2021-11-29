import { forwardRef, SelectHTMLAttributes } from 'react';
import Flex from 'common/component/Flex';
import DownIcon from '@icons/icons-dropdown-down.svg';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const FormSelect = forwardRef<HTMLSelectElement, IProps>(function FormSelect(
  props,
  ref,
) {
  const { children, ...rest } = props;
  return (
    <Flex className="relative items-center">
      <select
        ref={ref}
        className="w-full py-13 px-16 border border-solid rounded-2 border-gray60 bg-white text-15"
        {...rest}
      >
        {children}
      </select>
      <Flex className="absolute right-16 w-16 h-16 text-gray">
        <DownIcon />
      </Flex>
    </Flex>
  );
});

FormSelect.displayName = 'formSelect';

export default FormSelect;
