import PreventMobileBodyScroll from 'shared/component/PreventMobileBodyScroll';
import React, { ReactElement } from 'react';
import styles from './AlertContent.module.scss';
import { IAlertContentProps } from 'shared/component/KAlert';
import { TextButton, Text } from 'common/component/shared';

export type IProps = IAlertContentProps;

export default function AlertContent({
  title,
  desc,
  buttonSet = 'confirm',
  labelConfirm,
  labelClose,
  labelSecondConfirm,
  callback,
  callbackSecond,
  onRequestClose,
  isButtonVertical = false,
}: IProps) {
  function getBtnConfirm(index: number, _callback: () => void) {
    return (
      <TextButton
        {...getDefaultBtnProps(index)}
        onClick={_callback}
        variant="btn_black"
        textVariant="s16_normal_white"
      >
        {labelConfirm ?? '확인'}
      </TextButton>
    );
  }
  function getBtnSecond(index: number, _callback: () => void) {
    return (
      <TextButton
        {...getDefaultBtnProps(index)}
        onClick={_callback}
        variant="btn_black"
        textVariant="s16_normal_white"
      >
        {labelSecondConfirm}
      </TextButton>
    );
  }
  function getBtnCancel(index: number, _onRequestClose: () => void) {
    return (
      <TextButton
        {...getDefaultBtnProps(index)}
        onClick={_onRequestClose}
        variant="btn_black"
        textVariant="s16_normal_white"
      >
        {labelClose ?? '취소'}
      </TextButton>
    );
  }
  function getDefaultBtnProps(index: number) {
    return {
      key: index,
      width: '100%',
      height: '50px',
    };
  }

  const buttons: ReactElement[] = [];
  if (buttonSet === 'confirm' && callback) {
    buttons.push(getBtnConfirm(0, callback));
  } else if (buttonSet === 'cancel' && onRequestClose) {
    buttons.push(getBtnCancel(0, onRequestClose));
  } else if (buttonSet === 'cancelAndConfirm' && callback && onRequestClose) {
    buttons.push(getBtnCancel(0, onRequestClose));
    buttons.push(getBtnConfirm(1, callback));
  } else if (buttonSet === 'twoConfirm' && callback && callbackSecond) {
    buttons.push(getBtnSecond(0, callbackSecond));
    buttons.push(getBtnConfirm(1, callback));
  } else if (
    buttonSet === 'cancelAndTwoConfirm' &&
    callback &&
    callbackSecond &&
    onRequestClose
  ) {
    buttons.push(getBtnCancel(0, onRequestClose));
    buttons.push(getBtnSecond(1, callbackSecond));
    buttons.push(getBtnConfirm(2, callback));
  }

  const getClassName = (isGradient: boolean) => {
    if (isButtonVertical) {
      if (buttons.length === 3) {
        return isGradient ? styles.verticalGradient3 : styles.pb3;
      } else if (buttons.length === 2) {
        return isGradient ? styles.verticalGradient2 : styles.pb2;
      }
    }

    return isGradient ? styles.gradient : styles.pb1;
  };

  const isCustomTitle = typeof title !== 'string';
  const isCustomDesc = typeof desc !== 'string';
  return (
    <div className={cn(styles.alertWrapper, 'px-30', 'relative')}>
      <PreventMobileBodyScroll>
        {title && (
          <div
            className={cn(
              desc && 'mb-10',
              'mt-32',
              !desc && getClassName(false),
            )}
          >
            {isCustomTitle && title}
            {!isCustomTitle && (
              <Text
                variant="s16_normal_white"
                className={cn(styles.title, 'text-center')}
              >
                {title}
              </Text>
            )}
          </div>
        )}
        {desc && (
          <div
            onTouchMove={e => e.stopPropagation()}
            className={cn('text-center', getClassName(false), styles.desc)}
          >
            {isCustomDesc && desc}
            {!isCustomDesc && (
              <Text
                variant="s16_normal_white"
                className={cn({ ['mt-19']: !title })}
              >
                {desc}
              </Text>
            )}
          </div>
        )}
      </PreventMobileBodyScroll>
      <div
        className={cn(
          'absolute',
          'w-full',
          'px-20',
          isButtonVertical && buttons.length > 1
            ? styles.buttonsVerticalWrap
            : styles.buttonsWrap,
        )}
      >
        {buttons}
      </div>
      <div className={cn('absolute', 'w-full', getClassName(true))} />
    </div>
  );
}
