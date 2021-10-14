import { Store } from 'redux';
import { IStateDefault } from '../type';

export let getSharedStore: (
  initialState?: IStateDefault,
) => Store<IStateDefault>;

export let UI_TEST_PARAMS: {
  buttonVariant: string;
  activeButtonVariant: string;
  buttonTextVariant: string;
  labelTextVariant: string;
  checkBoxTextVariant: string;
  inputZIndex: number;
};
export function initializeShared<
  ButtonVariant extends string,
  TextVariant extends string,
>({
  getStore,
  uiTestParams,
}: {
  getStore: () => Store<IStateDefault>;
  uiTestParams: {
    buttonVariant: ButtonVariant;
    activeButtonVariant: ButtonVariant;
    buttonTextVariant: TextVariant;
    labelTextVariant: TextVariant;
    checkBoxTextVariant: TextVariant;
    inputZIndex: number;
  };
}) {
  getSharedStore = getStore;
  UI_TEST_PARAMS = uiTestParams;
}
