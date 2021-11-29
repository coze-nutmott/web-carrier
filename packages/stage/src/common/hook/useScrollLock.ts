import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

function useScrollLock(
  ref: React.RefObject<HTMLElement>,
  enableScroll = false,
): void {
  useEffect(() => {
    const targetElement: HTMLElement | Element | null = ref.current;

    if (targetElement) {
      if (enableScroll) {
        enableBodyScroll(targetElement);
      } else {
        disableBodyScroll(targetElement, {
          reserveScrollBarGap: true,
          allowTouchMove: el => {
            let currentEl: HTMLElement | Element | null = el;
            while (currentEl && currentEl !== document.body) {
              if (
                // TODO: 옮겨오면서 attribute값 변경됨. 확인 필요.
                currentEl.getAttribute('data-body-scroll-lock') === 'ignore'
              ) {
                return true;
              }
              currentEl = currentEl.parentElement;
            }
            return false;
          },
        });
      }
    }

    return () => {
      if (targetElement) {
        enableBodyScroll(targetElement);
      }
    };
  }, [ref, enableScroll]);
}

export default useScrollLock;
