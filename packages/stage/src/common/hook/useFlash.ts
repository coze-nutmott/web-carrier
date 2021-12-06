import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { parseDate } from 'shared/util/date';

import { actions as commonActions } from 'common/state/action';
import { IFlash } from 'common/type';
import { errorMessage, ERROR_MESSAGES } from 'common/util/errorMessage';

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function messageOrDefault(
  value: string | unknown,
  defaultMessage?: string,
): string {
  if (typeof value === 'string') {
    return value;
  }
  return errorMessage(value, defaultMessage);
}

export const showFlash = async (
  flash: Omit<IFlash, 'id'>,
  dispatch: Dispatch<any>, // TODO: COZE: change any to something
) => {
  const id = parseDate().getTime();
  dispatch(commonActions.pushFlash({ id, ...flash }));
  await wait(5000);
  dispatch(commonActions.popFlash());
};

function useFlash(): {
  showSuccessMessage: (messsage: string) => void;
  showErrorMessage: (value: string | unknown, defaultMessage?: string) => void;
} {
  const dispatch = useDispatch();

  const showSuccessMessage = (message: string) => {
    showFlash({ message, type: 'success' }, dispatch); // do not wait async
  };

  const showErrorMessage = (
    value: string | unknown,
    defaultMessage = ERROR_MESSAGES.DEFAULT,
  ) => {
    const message = messageOrDefault(value, defaultMessage);
    showFlash({ message, type: 'error' }, dispatch); // do not wait async
  };
  return {
    showSuccessMessage,
    showErrorMessage,
  };
}

export default useFlash;
