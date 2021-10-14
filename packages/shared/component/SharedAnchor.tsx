import { ComponentType, CSSProperties, forwardRef, Ref } from 'react';
import KRouter from '../util/sharedKRouter';

export interface IProps<PageInfo>
  extends Omit<React.HTMLProps<HTMLAnchorElement>, 'href' | 'ref'> {
  pageInfo?: PageInfo | string;
  display?: CSSProperties['display'];
  onClick?: (e: EventObject) => void;
  isPreventDefault?: boolean;
}

type CompType<T> = ComponentType<IProps<T>>;
export let SharedAnchor: CompType<any>;
export function createAnchor<
  Page extends string,
  PageInfo extends { page: Page },
>(kRouter: KRouter<Page, PageInfo>): CompType<PageInfo> {
  function Anchor(
    {
      pageInfo,
      display = 'block',
      style,
      onClick,
      isPreventDefault = true,
      ...rest
    }: IProps<PageInfo>,
    ref: Ref<HTMLAnchorElement>,
  ) {
    if (!pageInfo && !onClick) {
      return <div {...(rest as any)} style={{ ...style, display }} ref={ref} />;
    }

    const href = pageInfo
      ? typeof pageInfo === 'string'
        ? pageInfo
        : kRouter.getUrl(pageInfo)
      : '#none';

    function onClickHandler(e: EventObject) {
      if (isPreventDefault) {
        e.preventDefault();
      }

      if (onClick) {
        onClick(e);
      } else if (pageInfo) {
        kRouter.routeTo(pageInfo);
      }
    }
    return (
      <a
        {...rest}
        href={href}
        style={{ ...style, display }}
        onClick={onClickHandler}
        ref={ref}
      />
    );
  }
  SharedAnchor = forwardRef(Anchor);
  return SharedAnchor;
}
