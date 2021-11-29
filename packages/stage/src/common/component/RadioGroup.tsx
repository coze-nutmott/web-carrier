import Flex from 'common/component/Flex';
import { Text } from 'common/component/shared';
import { forwardRef, ReactNode } from 'react';

import styles from 'common/component/RadioGroup.module.scss';

interface IProps {
  name: string;
  children?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  value: string | number;
}

const RadioGroup = forwardRef<HTMLInputElement, IProps>(function RadioGroup(
  props,
  ref,
) {
  const { children, name, value, checked, defaultChecked, disabled, onChange } =
    props;
  return (
    <Flex as="label" className="mr-16 items-center">
      <input
        className={cn(
          'flex-none appearance-none outline-none w-16 h-16 mr-6 rounded-1/2 bg-white transition-border duration-200',
          styles.radioGroup,
        )}
        type="radio"
        name={name}
        value={value}
        ref={ref}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <Text variant={disabled ? 's15_normal_gray' : 's15_normal_black'}>
        {children}
      </Text>
    </Flex>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
