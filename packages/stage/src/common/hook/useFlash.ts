import { errorMessage, ERROR_MESSAGES } from 'common/util/errorMessage';
import { useDispatch } from 'react-redux';
import { IFlash } from 'common/type';
import { Dispatch } from 'redux';
import { actions as commonActions } from 'common/state/action';
import { parseDate } from 'shared/util/date';

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

// TODO: COZE: how to solve unused var error?
// similar question: https://stackoverflow.com/questions/63767199/typescript-eslint-no-unused-vars-false-positive-in-type-declarations
function useFlash(): {
  showSuccessMessage: (messsage: string) => void; // eslint-disable-line no-unused-vars
  showErrorMessage: (value: string | unknown, defaultMessage?: string) => void; // eslint-disable-line no-unused-vars
} {
  const dispatch = useDispatch();

  const showSuccessMessage = (message: string) => {
    // dispatch(showFlash({ message, type: 'success' }));
  };

  const showErrorMessage = (
    value: string | unknown,
    defaultMessage = ERROR_MESSAGES.DEFAULT,
  ) => {
    const message = messageOrDefault(value, defaultMessage);
    showFlash({ message, type: 'error' }, dispatch); // do not take return
  };
  return {
    showSuccessMessage,
    showErrorMessage,
  };
}

export default useFlash;