import { Column } from 'common/component/Flex';
import { TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export default function FormTextarea({
  name,
  placeholder,
  maxLength,
  disabled,
  className,
}: IProps) {
  const { register, watch } = useFormContext();
  const size = watch(name)?.length | 0;

  return (
    <Column
      className={cn('rounded-2 border border-solid text-gray60', className)}
    ></Column>
  );
}
