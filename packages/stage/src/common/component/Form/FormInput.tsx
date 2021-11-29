import Flex from 'common/component/Flex';
import Input from 'common/component/Input';
import { Text } from 'common/component/shared';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}
export default function FormInput({
  name,
  placeholder,
  maxLength,
  disabled,
}: IProps) {
  const { register, watch } = useFormContext();
  const size = watch(name)?.length | 0;
  return (
    <Flex className="rounded-2 border border-solid border-gray60">
      <Input
        className="w-full py-13 px-16 border-0 outline-none text-15"
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        ref={register}
      />
      <Flex className="mr-12 justify-center items-center flex-shrink-0">
        <Text variant="s12_normal_gray">{size + ` / ` + maxLength}</Text>
      </Flex>
    </Flex>
  );
}
