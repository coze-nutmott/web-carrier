import { HTMLProps } from 'react';

interface IProps extends HTMLProps<HTMLSpanElement> {
  variant?: keyof typeof TAG_VARIANTS;
  border?: keyof typeof TAG_BORDER_VARIANTS;
}
export default function Tag({
  variant = 'primary',
  border = 'round',
  className,
  ...props
}: IProps) {
  return (
    <span
      className={cn(
        'inline-flex flex-0-0-auto font-medium text-12 py-2 px-6',
        TAG_VARIANTS[variant],
        TAG_BORDER_VARIANTS[border],
        className,
      )}
      {...props}
    ></span>
  );
}

const TAG_VARIANTS = {
  primary: 'text-black bg-yellow border-1 border-solid border-yellow',
  secondary: 'text-white bg-navy border-1 border-solid border-navy',
  disabled: 'text-grayFont bg-gray90 border-1 border-solid border-gray90',
};

const TAG_BORDER_VARIANTS = {
  round: 'rounded-12',
  square: 'rounded-2',
};
