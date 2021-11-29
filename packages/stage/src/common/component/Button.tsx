import { ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof BUTTON_SIZE_VARIANTS;
}

export default function Button({
  variant = 'none',
  size = 'large',
  className,
  ...props
}: IProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center border-1 border-solid appearance-none',
        BUTTON_VARIANTS[variant],
        BUTTON_SIZE_VARIANTS[size],
        className,
      )}
      {...props}
    />
  );
}

const BUTTON_VARIANTS = {
  primary: 'bg-black border-black text-white',
  secondary: 'bg-yellow border-yellow text-black',
  tertiary: 'bg-secondary border-secondary text-white',
  white: 'bg-white border-gray10 text-grayFont',
  disabled: 'bg-gray80 border-gray80 text-grayFont cursor-auto',
  borderless: 'border-0 text-grayFont',
  none: '',
};

const BUTTON_SIZE_VARIANTS = {
  large: 'py-12 px-15 text-16 font-medium',
  medium: 'py-9 px-11 text-14 font-normal',
  small: 'py-5 px-9 text-14 font-normal',
  round: 'rounded-100 py-6 px-14 text-14 font-medium',
  text: 'p-0',
};
