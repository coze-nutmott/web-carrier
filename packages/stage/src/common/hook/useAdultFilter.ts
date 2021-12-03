// import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';

// import { ageCertificationPath } from '@/routes';

// import useRootState from '@/hooks/useRootState';
// import useSession from '@/hooks/useSession';
// import useFlash from '@/hooks/useFlash';

// import { toggleAdult } from '@/modules/adultFilter';
// import { saveState } from '@/helpers/adultFilter';

interface IUseAdultFilter {
  isAdultOn: boolean;
  toggle: () => void;
}

function useAdultFilter(): IUseAdultFilter {
  // const dispatch = useDispatch();
  // const router = useRouter();
  // const { showErrorMessage } = useFlash();
  // const adultOnState = useRootState((state) => state.adultFilter.on);
  // const { loggedOut, login, verifiedAdult } = useSession();

  // const isAdultOn = adultOnState && verifiedAdult === true;
  const isAdultOn = false;

  const toggle = () => {};
  // const toggle = () => {
  //   if (loggedOut) {
  //     login();
  //     return;
  //   }

  //   if (verifiedAdult === false) {
  //     showErrorMessage(
  //       '이 정보 내용은 청소년 유해 매체물로서 정보통신망 이용 촉진 및 정보 보호등에 관한 법률 및 청소년 보호법의 규정에 의하여 19세 미만의 청소년은 이용할 수 없습니다.'
  //     );
  //     return;
  //   }

  //   if (verifiedAdult === null || verifiedAdult === undefined) {
  //     router.push(
  //       ageCertificationPath({ redirectTo: window.location.pathname })
  //     );
  //     return;
  //   }

  //   dispatch(toggleAdult());

  //   saveState(!isAdultOn);
  // };

  return {
    isAdultOn,
    toggle,
  };
}

export default useAdultFilter;
