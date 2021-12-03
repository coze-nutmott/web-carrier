import React, { ReactElement } from 'react';

import Image from 'next/image';

import { SharedText } from '../../component/SharedText';
import styles from './Toast.module.scss';

export type IProps<T extends string> =
  | (ICommonProps & IRenderProps1)
  | (ICommonProps & IRenderProps2<T>);

interface ICommonProps {
  title?: string;
  desc: string;
  isClosing: boolean;
  img?: string;
  imgSize?: string;
}
export interface IRenderProps1 {
  render: (
    props: ICommonProps & {
      containerClassName: string;
      closingClassName: string;
    },
  ) => ReactElement;
}
export interface IRenderProps2<T extends string> {
  textVariant: T;
}

export default function Toast<T extends string>(props: IProps<T>) {
  const { title, desc, isClosing, img, imgSize, ...rest } = props;
  return 'render' in rest ? (
    rest.render({
      ...props,
      containerClassName: styles.toast,
      closingClassName: styles.closing,
    })
  ) : (
    <div
      className={cn(styles.toast, 'px-30', 'py-15', 'm-auto', {
        [styles.closing]: isClosing,
      })}
    >
      <>
        {img && (
          <Image
            src={img}
            alt=""
            className="mb-15"
            width={imgSize}
            height={imgSize}
          />
        )}
        {title && (
          <SharedText variant={rest.textVariant} className="mb-5">
            {title}
          </SharedText>
        )}
        <SharedText variant={rest.textVariant}>{desc}</SharedText>
      </>
    </div>
  );
}
