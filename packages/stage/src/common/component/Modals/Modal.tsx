import {
  useRef,
  MouseEvent,
  ReactNode,
  forwardRef,
  HTMLProps,
  useMemo,
} from 'react';
import useScrollLock from 'common/hook/useScrollLock';
import { createPortal } from 'react-dom';
import Flex from 'common/component/Flex';
import { ZIndex } from 'common/style/variable';
import useMedia from 'common/hook/useMedia';
import isArray from 'lodash/isArray';
import ExitIcon from '@icons/icons-exit.svg';

interface IProps {
  closeOutside?: () => void;
  needCloseIcon?: boolean;
  width?: string | string[];
  level?: 'normal' | 'top';
  fixBottom?: boolean;
  blurBackground?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function Modal({
  closeOutside,
  needCloseIcon = true,
  width = '392px',
  level = 'normal',
  fixBottom = false,
  blurBackground = false,
  className,
  children,
}: IProps) {
  const modalRef = useRef(null);
  const isDesktop = useMedia('desktop');
  useScrollLock(modalRef);

  const modalWidth = useMemo(() => {
    if (isArray(width)) {
      return width.length > 1 && isDesktop ? width[1] : width[0];
    }
    return width;
  }, [isDesktop, width]);

  const handleClose = (event: MouseEvent) => {
    if (event.target === event.currentTarget && closeOutside) {
      closeOutside();
    }
    event.stopPropagation();
  };

  let modalLevel;
  if (level === 'normal') {
    modalLevel = document.getElementById('modal-normal');
  } else {
    modalLevel = document.getElementById('modal-top');
  }
  return modalLevel
    ? createPortal(
        <ModalBackdrop
          ref={modalRef}
          onClick={handleClose}
          style={{
            backdropFilter: blurBackground ? 'blur(5px)' : '',
            WebkitBackdropFilter: blurBackground ? 'blur(5px)' : '',
          }}
        >
          <div
            className={cn(
              `mx-auto mt-auto ${
                fixBottom ? 'mb-0 rounded-t-8' : 'mb-auto rounded-t-0'
              } overflow-auto relative`,
              className,
            )}
            style={{ width: modalWidth, maxHeight: 'calc(100% - 80px)' }}
          >
            {needCloseIcon && (
              <div className="absolute top-14 right-10">
                <button className="mr-10" onClick={closeOutside}>
                  <ExitIcon className="w-16 h-16 text-grayDisabled" />
                </button>
              </div>
            )}

            <div
              className="overflow-auto"
              // NOTE: 사파리 브라우저에서 스크롤 버그를 수정합니다
              data-body-scroll-lock="ignore"
            >
              {children}
            </div>
          </div>
        </ModalBackdrop>,
        modalLevel,
      )
    : null;
}

export const ModalBackdrop = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(
  function ModalBackdrop({ className, style, ...props }, ref) {
    return (
      <Flex
        ref={ref}
        className={cn(
          'fixed inset-0 bg-dimmed justify-center items-center',
          className,
        )}
        style={{ zIndex: ZIndex.Modal, ...style }}
        {...props}
      />
    );
  },
);
