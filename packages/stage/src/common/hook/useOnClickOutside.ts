import { useEffect, RefObject } from 'react';
type IEvent = MouseEvent | TouchEvent;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: IEvent) => void,
) {
  useEffect(() => {
    const listener = (event: IEvent) => {
      if (ref.current?.contains(event?.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`click`, listener);

    return () => {
      document.removeEventListener(`click`, listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
