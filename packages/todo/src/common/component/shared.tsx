import {
  createText,
  IProps as ISharedTextProps,
} from 'shared/component/SharedText';
import { colors } from 'common/style/theme';
import {
  createTextButton,
  IProps as ISharedTextButtonProps,
} from 'shared/component/SharedTextButton';
import { IButtonVariant, ITextVariant } from 'common/style';
import {
  createAnchor,
  IProps as ISharedAnchorProps,
} from 'shared/component/SharedAnchor';
import { IPageInfo, kRouter } from 'common/util/kRouter';
import {
  createCheckBox,
  IProps as ISharedCheckBoxProps,
} from 'shared/component/SharedCheckBox';

export type ITextProps = ISharedTextProps<ITextVariant>;
export const Text = createText<ITextVariant>(colors);

export type ITextButtonProps = ISharedTextButtonProps<
  IButtonVariant,
  ITextVariant
>;
export const TextButton = createTextButton<IButtonVariant, ITextVariant>();

export type IAnchorProps = ISharedAnchorProps<IPageInfo>;
export const Anchor = createAnchor(kRouter);

export type ICheckBoxProps = ISharedCheckBoxProps<ITextVariant>;
export const CheckBox = createCheckBox<ITextVariant>({
  defaultCheckedImg: '/icon-check-on.svg',
  defaultUncheckedImg: '/icon-check-off.svg',
  defaultImgWidth: 18,
});
