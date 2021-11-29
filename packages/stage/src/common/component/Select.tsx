import { useState } from 'react';

import ListIcon from '@icons/icons-sort.svg';
import UpDownListIcon from '@icons/icons-updown-sort.svg';
import CheckIcon from '@icons/icons-check.svg';
import DropdownIcon from '@icons/icons-dropdown-down.svg';
import FoldDownIcon from '@icons/icons-fold-down.svg';
import Flex from 'common/component/Flex';
import Dropdown from 'common/component/Dropdown';
import { ZIndex } from 'common/style/variable';

interface IOption {
  value: string;
  text: string;
}
interface IProps {
  options: IOption[];
  onChange: (value: IOption) => void;
  defaultValue?: IOption;
  withIcon?: boolean;
  isLeft?: boolean;
  dropdownClassName?: string;
  sortIconType?: 'list' | 'fold' | 'updown';
  sortClassName?: string;
}

export default function Select({
  onChange,
  defaultValue,
  options,
  withIcon = false,
  isLeft = false,
  dropdownClassName,
  sortIconType,
  sortClassName,
  ...props
}: IProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selected, setSelected] = useState<IOption>(defaultValue || options[0]);

  const handleChange = (option: IOption) => {
    setIsOpened(false);
    setSelected(option);
    onChange(option);
  };

  const SortIcon = () => {
    if (sortIconType === 'list') {
      return <ListIcon className="w-16 h-16" />;
    }
    if (sortIconType === 'fold') {
      return <FoldDownIcon className="w-12 h-13" />;
    }
    if (sortIconType === 'updown') {
      return <UpDownListIcon className="w-16 h-16" />;
    }
    return <DropdownIcon className="w-16 h-16" />;
  };

  return (
    <div className="relative font-medium" {...props}>
      <button
        className="relative items-center cursor-pointer font-medium"
        onClick={() => setIsOpened(prev => !prev)}
      >
        <Flex className={sortClassName}>
          {selected.text}
          <div className={cn('w-16 h-16 ml-4 mt-4', sortClassName)}>
            <SortIcon />
          </div>
        </Flex>
      </button>
      {isOpened && (
        <Dropdown
          className={cn(
            `absolute top-full mt-8 whitespace-nowrap ${
              isLeft ? 'left-0' : 'right-0'
            }`,
            dropdownClassName,
          )}
          style={{ zIndex: ZIndex.SelectDropdown }}
          onClose={() => setIsOpened(false)}
        >
          {options.map(option => (
            <Flex
              key={option.value}
              onClick={() => handleChange(option)}
              className={cn(`items-center w-full cursor-pointer`, {
                'pr-28': withIcon,
              })}
            >
              {option.text}
              {withIcon && option.value === selected.value && (
                <Flex className="absolute right-16 w-12 h-12 ml-16 text-yellow">
                  <CheckIcon />
                </Flex>
              )}
            </Flex>
          ))}
        </Dropdown>
      )}
    </div>
  );
}
