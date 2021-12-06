import { useEffect } from 'react';

import { useRouter } from 'next/router';

/**
 * `shouldConfirmRouteChage`가 `true`이면 `next/router`의 `routhChangeStart` 이벤트가 발생했을 때
 * `confirmRouteChange: () => boolean` 콜백을 호출하고 콜백이 `false`를 리턴하면
 * 예외를 발생시켜 route를 중단합니다.
 *
 * NOTE: iOS safari 브라우저에서는 히스토리 이동 중 window.confirm이 제대로 동작하지 않는 문제가 있어 iOS에서는 이 훅의 기능을 동작하지 않도록 합니다.
 */
export default function useConfirmRouteChangeIf(
  shouldConfirmRouteChange: boolean,
  confirmRouteChange: () => boolean,
): void {
  const router = useRouter();
  // @ts-ignore
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  useEffect(() => {
    const routeChangeStart = (url: string) => {
      if (
        router.asPath !== url &&
        shouldConfirmRouteChange &&
        !confirmRouteChange()
      ) {
        router.events.emit('routeChangeError');

        // NOTE: Route 이동을 막기 위해서 예외를 발생시킵니다. route 변경을 취소할 수 있는 공식 API는 아직 없습니다.
        // See: https://github.com/zeit/next.js/issues/2476#issuecomment-573460710
        throw `Route change to "${url}" was aborted.`;
      }
    };

    if (!isIOS) {
      router.events.on('routeChangeStart', routeChangeStart);
    }

    return () => {
      if (!isIOS) {
        router.events.off('routeChangeStart', routeChangeStart);
      }
    };
  }, [
    router.asPath,
    router.events,
    shouldConfirmRouteChange,
    confirmRouteChange,
    isIOS,
  ]);
}
