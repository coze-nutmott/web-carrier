import React, {
  ComponentType,
  CSSProperties,
  HTMLProps,
  ReactNode,
} from 'react';

import Image from 'next/image';

import { SharedText } from '../component/SharedText';
import styles from './SharedCheckBox.module.scss';

export interface IProps<T> extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
  imgChecked?: string;
  imgUnchecked?: string;
  imgWidth?: number;
  text?: string | ReactNode;
  textVariant?: T;
  id: string;
  additionalElement?: ReactNode;
  checkBoxStyle?: CSSProperties;
  textDistance?: number;
  textClassName?: string;
}

type CompType<T> = ComponentType<IProps<T>>;
export let SharedCheckBox: CompType<any>;
export function createCheckBox<T extends string>({
  defaultCheckedImg,
  defaultUncheckedImg,
  defaultImgWidth,
}: {
  defaultCheckedImg: string;
  defaultUncheckedImg: string;
  defaultImgWidth: number;
}): CompType<T> {
  SharedCheckBox = function CheckBox({
    imgChecked = defaultCheckedImg,
    imgUnchecked = defaultUncheckedImg,
    imgWidth = defaultImgWidth,
    text,
    textVariant,
    className,
    id,
    additionalElement,
    checkBoxStyle,
    style,
    textDistance = 10,
    textClassName,
    ...rest
  }: IProps<T>) {
    const imgHeight = imgWidth;
    const isCustomText = typeof text !== 'string';
    return (
      <div className={cn(styles.checkBox, className)} style={checkBoxStyle}>
        <input
          type="checkbox"
          id={id}
          className={styles.input}
          style={{ ...style, width: imgWidth, height: imgHeight }}
          {...rest}
        />
        <Image
          src={rest.checked ? imgChecked : imgUnchecked}
          width={imgWidth}
          height={imgHeight}
          alt=""
        />
        {text && isCustomText && text}
        {text && !isCustomText && textVariant && (
          <SharedText
            as="label"
            htmlFor={id}
            variant={textVariant}
            className={textClassName}
            style={{ marginLeft: `${textDistance}px` }}
          >
            {text}
          </SharedText>
        )}
        {additionalElement}
      </div>
    );
  };
  return SharedCheckBox;
}
