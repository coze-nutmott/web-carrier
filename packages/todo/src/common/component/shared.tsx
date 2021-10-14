import { initializeShared } from 'shared/common';
import {
  createText,
  IProps as ISharedTextProps,
} from 'shared/component/SharedText';
import * as textVariant from 'common/style/textVariant';
import * as color from 'common/style/color';
import {
  createTextButton,
  IProps as ISharedTextButtonProps,
} from 'shared/component/SharedTextButton';
import { IButtonVariant, ITextVariant } from 'common/style';
import * as buttonVariant from 'common/style/buttonVariant';
import {
  createAnchor,
  IProps as ISharedAnchorProps,
} from 'shared/component/SharedAnchor';
import { IPageInfo, kRouter } from 'common/util/kRouter';
import {
  createCheckBox,
  IProps as ISharedCheckBoxProps,
} from 'shared/component/SharedCheckBox';
import { getStore } from 'common/store';
import { ZIndex } from 'common/style/variable';

/**
 * 주요 포인트
 * shared 패키지의 초기화를 위해 필요합니다
 * 아래 함수가 호출될 수 있도록 _app 에서 이 모듈을 import 해줘야 합니다
 */
initializeShared<IButtonVariant, ITextVariant>({
  getStore,
  uiTestParams: {
    buttonVariant: 'btn_grey01',
    activeButtonVariant: 'btn_transparent_gold',
    buttonTextVariant: 's16_regular_black',
    labelTextVariant: 's16_regular_black',
    checkBoxTextVariant: 's16_regular_black',
    inputZIndex: ZIndex.Modal - 1,
  },
});

export type ITextProps = ISharedTextProps<ITextVariant>;
export const Text = createText(textVariant, color);

export type ITextButtonProps = ISharedTextButtonProps<
  IButtonVariant,
  ITextVariant
>;
export const TextButton = createTextButton<IButtonVariant, ITextVariant>(
  buttonVariant,
);

export type IAnchorProps = ISharedAnchorProps<IPageInfo>;
export const Anchor = createAnchor(kRouter);

export type ICheckBoxProps = ISharedCheckBoxProps<ITextVariant>;
export const CheckBox = createCheckBox<ITextVariant>({
  defaultCheckedImg: '/icon-check-on.svg',
  defaultUncheckedImg: '/icon-check-off.svg',
  defaultImgWidth: 18,
});
