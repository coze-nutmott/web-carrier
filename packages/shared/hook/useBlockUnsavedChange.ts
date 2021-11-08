import { useEffect } from 'react';
import { sharedKRouter } from '../util/sharedKRouter';
import { kAlert } from '../component/KAlert';

export default function useBlockUnsavedChange(title: string, isBlock: boolean) {
  useEffect(() => {
    if (isBlock) {
      const getIsRouteCancel = (letItGo: Function) => {
        kAlert({ title, buttonSet: 'cancelAndConfirm' }).then(
          ({ okClicked }) => {
            if (okClicked) {
              unsubscribe();
              letItGo();
            }
          },
        );
        return true;
      };
      const unsubscribe = sharedKRouter.subscribeRouteCancel(getIsRouteCancel);
      const onBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = title;
      };
      window.addEventListener('beforeunload', onBeforeUnload);
      return () => {
        unsubscribe();
        window.removeEventListener('beforeunload', onBeforeUnload);
      };
    }
    return;
  }, [title, isBlock]);
}
