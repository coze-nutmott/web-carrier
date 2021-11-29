import { forwardRef, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      className={cn(
        'border border-solid border-gray60 rounded-2 text-16 desktop:text-15 p-8',
        className,
      )}
      {...rest}
    ></input>
  );
});

Input.displayName = 'Input';

export default Input;
