import { ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof BUTTON_VARIANTS;
  size: keyof typeof BUTTON_SIZE_VARIANTS;
}

export default function RoundButton({
  variant,
  size,
  className,
  ...props
}: IProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center cursor-pointer rounded-1/2 border-0 border-none appearance-none',
        BUTTON_VARIANTS[variant],
        BUTTON_SIZE_VARIANTS[size],
        className,
      )}
      {...props}
    />
  );
}

const BUTTON_VARIANTS = {
  primary: 'bg-black text-white',
  secondary: 'bg-yellow text-black',
  tertiary: 'bg-secondary text-white',
  divide: 'bg-divideArea text-grayFont',
  disabled: 'bg-gray80 text-grayFont',
  lightDisable: 'bg-lightDisabled text-grayFont',
};

const BUTTON_SIZE_VARIANTS = {
  wide: 'py-6 px-20 text-14 font-normal',
  medium: 'py-5 px-12 text-14 font-normal',
  narrow: 'py-1 px-10 text-14 font-normal',
};
