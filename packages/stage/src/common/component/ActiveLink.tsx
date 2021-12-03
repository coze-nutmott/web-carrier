import { forwardRef, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface IProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  activeClassName?: string;
  isSamePath?: boolean;
  isIncludePath?: boolean;
}

type Ref = HTMLAnchorElement;

const ActiveLink = forwardRef<Ref, IProps>(
  (
    {
      children,
      onClick,
      href,
      className,
      activeClassName = 'text-black',
      isSamePath,
      isIncludePath,
      ...props
    },
    ref,
  ) => {
    const router = useRouter();

    const isActive =
      (!isSamePath && router.asPath.split('?')[0] === href?.split('?')[0]) ||
      (isIncludePath && href && router.asPath.includes(href)) ||
      router.asPath === href ||
      decodeURIComponent(router.asPath) === href ||
      (typeof window !== 'undefined' && window.location.pathname === href);

    return (
      <a
        ref={ref}
        onClick={onClick}
        href={href}
        className={cn('text-grayFont', className, {
          [activeClassName]: isActive,
        })}
        {...props}
      >
        {children}
      </a>
    );
  },
);
ActiveLink.displayName = 'ActiveLink';

export default ActiveLink;
