import { ComponentType, forwardRef, HTMLProps, ReactNode, Ref } from 'react';

import { SharedText, IProps as ITextProps } from '../component/SharedText';

export interface IProps<BV extends string, TV extends string>
  extends Omit<HTMLProps<HTMLButtonElement>, 'type' | 'ref'> {
  variant: BV;
  textVariant: TV;
  textClassName?: string;
  width?: string;
  height?: string;
  textAs?: ITextProps['as'];
  beforeElement?: ReactNode;
}

type CompType<BV extends string, TV extends string> = ComponentType<
  IProps<BV, TV>
>;
export let SharedTextButton: CompType<any, any>;
export function createTextButton<
  BV extends string,
  TV extends string,
>(): CompType<BV, TV> {
  function TextButton(
    {
      variant,
      textVariant,
      width,
      height,
      children,
      className,
      textClassName,
      style,
      textAs = 'span',
      beforeElement,
      ...rest
    }: IProps<BV, TV>,
    ref: Ref<HTMLButtonElement>,
  ) {
    return (
      <button
        ref={ref}
        className={cn(variant, 'px-10', 'py-0', className)}
        style={{ ...style, width, height }}
        {...rest}
      >
        {beforeElement}
        {children && (
          <SharedText
            variant={textVariant}
            className={textClassName}
            as={textAs}
          >
            {children}
          </SharedText>
        )}
      </button>
    );
  }
  SharedTextButton = forwardRef(TextButton);
  return SharedTextButton;
}
