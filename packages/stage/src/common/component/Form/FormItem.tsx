import Label from 'common/component/Label';
import { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  required?: boolean;
}

export default function FormItem({
  title,
  required,
  className,
  children,
}: IProps) {
  return (
    <div className={cn('w-full', className)}>
      {title && (
        <Label required={required} className={cn('text-14', className)}>
          {title}
        </Label>
      )}
      {children}
    </div>
  );
}
