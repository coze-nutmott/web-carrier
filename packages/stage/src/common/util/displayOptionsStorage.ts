import { IDisplayOptions } from 'common/type';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from 'shared/util/localStorage';

const DEFAULT_STATE: IDisplayOptions = {
  background: 'lightMode',
  fontSize: 18,
  font: 'sans-serif',
};

const KEY_OF_DISPLAY_OPTIONS = 'displayOptions';

export const loadState = (): IDisplayOptions => {
  const serializedState = getLocalStorageObject<IDisplayOptions>(
    KEY_OF_DISPLAY_OPTIONS,
  );
  if (serializedState) {
    return serializedState;
  }
  return DEFAULT_STATE;
};

export const saveState = (displayOptions: IDisplayOptions): void => {
  setLocalStorageObject<IDisplayOptions>({
    key: KEY_OF_DISPLAY_OPTIONS,
    value: displayOptions,
  });
};
