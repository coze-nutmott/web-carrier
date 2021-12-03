import { ComponentType } from 'react';

interface IUseLayoutParams {
  activeGenre?: string;
  header?: ComponentType;
  footer?: ComponentType;
}

function useLayout(layouts: IUseLayoutParams): void {
  // const dispatch = useDispatch();
  // const { header, footer, activeGenre } = layouts;
  // useEffect(() => {
  //   dispatch(setHeader(header));
  //   dispatch(setFooter(footer));
  //   dispatch(setActiveGenre(activeGenre));
  //   return () => {
  //     dispatch(setHeader(DefaultHeader));
  //     dispatch(setFooter(GlobalFooter));
  //     dispatch(setActiveGenre(undefined));
  //   };
  // }, [dispatch, header, footer, activeGenre]);
}

const Empty = () => null;

export function useEmptyLayout(): void {
  useLayout({ header: Empty, footer: Empty });
}

export default useLayout;
