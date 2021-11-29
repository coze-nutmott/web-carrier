import { colors } from 'common/style/theme';
import Flex from 'common/component/Flex';
import { forwardRef, InputHTMLAttributes } from 'react';
import CheckIcon from '@icons/icons-check.svg';
import styles from './Checkbox.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  onClick?: () => void;
}

/**
 * TODO
 * check 아이콘 미노출
 */
const Checkbox = forwardRef<HTMLInputElement, IProps>(function Checkbox(
  props,
  ref,
) {
  const { name, value, children, disabled, onClick } = props;
  return (
    <Flex
      as="label"
      className={`items-start text-14 ${
        disabled ? 'text-grayFont' : 'text-black'
      }`}
      onClick={onClick}
    >
      <Flex className="mt-2 flex-shrink-0">
        <Flex className="relative mr-8">
          <input
            ref={ref}
            className="w-18 h-18 border-none outline-none"
            type="checkbox"
            disabled={disabled}
            value={value}
            name={name}
          />
          <Flex
            className={cn(
              'absolute inset-0 w-18 h-18 p-3 border border-solid border-gray60 rounded-2',
              styles.mockCheckbox,
            )}
            style={{ color: disabled ? '#ededed' : colors.white }}
          >
            <CheckIcon />
          </Flex>
        </Flex>
      </Flex>
      <Flex>{children}</Flex>
    </Flex>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
