import { TouchEvent, useRef, useEffect, ReactNode } from 'react';

import styles from './PreventMobileBodyScroll.module.scss';

interface IProps {
  /**
   * parent에 height없이 max-height만 지정되어 있고, child에서 max-height을 %로 지정하면 max-height 이 무시된다.
   * 그래서 vh나 px만 써야한다. (현재는 60vh 사용)
   */
  height?: string;
  maxHeight?: string;
  children: ReactNode;
}

/**
 * 모달 내에서 스크롤이 필요한 경우에 이 컴포넌트를 사용할 수 있다
 * 모달 내에서 스크롤 시 모달 뒤에 있는 요소가 스크롤되는 것을 막아준다
 *
 * scrollTop === 0(최상단) or scrollTop === scrollHeight-offsetHeight(최하단) 일때
 * 스크롤이 불가한 방향으로 스크롤하면(ex. 최상단에서 위로 스크롤) body 영역에 스크롤이 발생한다.
 * 이를 막기위해 scrollTop === 0이면 1로 변경, scrollTop === scrollHeight-offsetHeight면 1을 뺀다.
 *
 * div element가 최초 로딩되었을때(useEffect) scrollTop = 0 이므로 scrollTop = 1로 변경
 * onScroll: 스크롤이 종료되었을때 최상단이면 scrollTop을 1로 최하단이면 scrollHeight-offsetHeight-1로 변경
 * onTouch: body로 touchmove 이벤트가 버블링되지 않도록 e.stopPropagation()을 호출한다.
 */
export default function PreventMobileBodyScroll({
  height,
  maxHeight = '100%',
  children,
}: IProps) {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!divRef || !divRef.current) {
      return;
    }
    preventScrollBounce(divRef.current);
    return () => {
      isPreventScroll = false;
    };
  }, []);
  return (
    <div
      className={styles.preventMobileBodyScroll}
      ref={divRef}
      onScroll={e => {
        !isPreventScroll && preventScrollBounce(e);
        isPreventScroll = false;
      }}
      onTouchMove={(e: TouchEvent<HTMLDivElement>) => {
        if (!preventScrollBounce(e)) {
          e.stopPropagation();
          isPreventScroll = false;
        }
      }}
      style={{
        height,
        maxHeight,
      }}
    >
      {children}
    </div>
  );
}

/**
 * TODO: 아이폰 사파리에서 팝업 컨텐츠 영역을 터치하면 스크롤이 되는 문제가 있다.
 *   - isPreventScroll 변수를 사용하기 전에 발생함
 *   - isPreventScroll 변수를 사용하지 않으면 컨텐츠가 떨리는 이슈가 발생함
 * TODO: 모든 아이폰 사파리에서 하단 메뉴 영역을 터치하면 스크롤이 되는 문제가 있다.
 */
let isPreventScroll = false;
function preventScrollBounce(e: EventObject | HTMLDivElement): boolean {
  const el = 'currentTarget' in e ? (e.currentTarget as HTMLDivElement) : e;
  const { scrollTop, offsetHeight, scrollHeight } = el;
  if (scrollTop <= 0) {
    el.scrollTo(0, 1);
    isPreventScroll = true;
    return true;
  }
  if (scrollTop + offsetHeight >= scrollHeight) {
    el.scrollTo(0, scrollHeight - offsetHeight - 1);
    isPreventScroll = true;
    return true;
  }
  return false;
}
