import { useEffect, CSSProperties, ReactNode } from 'react';

import ReactModal from 'react-modal';

import { IS_CLIENT } from '../common/constant';
import usePrevious from '../hook/usePrevious';
import { MODAL_ANIMATION_DURATION } from '../style/variable';
import { sharedKRouter } from '../util/sharedKRouter';
import { sharedModalZIndex } from './SharedContainer';

export interface IProps {
  isOpen: boolean;
  zIndex?: number;
  onRequestClose: (e?: React.MouseEvent | React.KeyboardEvent) => void;
  onAfterClose?: () => void;
  onAfterOpen?: () => void;
  // overlay를 제외하고 실제 내용이 들어가는 영역의 스타일
  contentStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
  children: ReactNode;
  shouldCloseOnOverlayClick?: boolean;
  contentRef?: (ref?: HTMLDivElement) => void;
  className?: {
    base: string;
    afterOpen: string;
    beforeClose: string;
  };
}

export default function Modal({
  children,
  isOpen,
  zIndex = sharedModalZIndex,
  onRequestClose,
  onAfterClose,
  onAfterOpen,
  contentStyle,
  overlayStyle = FULL_OVERLAY_STYLE,
  shouldCloseOnOverlayClick = true,
  contentRef,
  className,
}: IProps) {
  const style = {
    overlay: { ...overlayStyle, zIndex },
    content: contentStyle || DEFAULT_CONTENT_STYLE,
  };

  // 실제로 모달이 닫히기 전에 children이 변경되어 보이는 것을 방지하기위해
  // 이전 children을 기억했다가 isOpen이 false인 경우에 사용한다.
  const prevChildren = usePrevious(children);

  useEffect(() => {
    return sharedKRouter.subscribeRouteCancel((_, params) => {
      // routeBack 만 검사한다
      if (isOpen && !sharedKRouter.getIsRouteTo(params)) {
        onRequestClose();
        return true;
      } else {
        return false;
      }
    });
  }, [isOpen, onRequestClose]);

  useEffect(() => {
    /**
     * 모달 내부에서 스크롤이 필요하다면 해당 태그에 touchmove 이벤트를 바인딩하고 e.stopPropagation()을 추가해야한다.
     * 그렇지 않으면 window로 이벤트가 전파(버블링)되고 아래의 e.preventDefault()가 실행되서 기본동작(scroll)이 안되는 문제가 발생한다.
     */
    const handleTouchMove = (e: TouchEvent) => {
      if (isOpen) {
        e.preventDefault();
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen]);
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      contentLabel="PageModal"
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={onRequestClose}
      onAfterClose={onAfterClose}
      closeTimeoutMS={MODAL_ANIMATION_DURATION}
      style={style}
      contentRef={contentRef}
      className={className}
    >
      {isOpen ? children : prevChildren}
    </ReactModal>
  );
}

if (IS_CLIENT) {
  ReactModal.setAppElement(`#__next`);
}

export const DEFAULT_CONTENT_STYLE: CSSProperties = {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  transform: 'translate(-50%, -50%)',
  padding: 0,
  width: '300px',
  borderRadius: '5px',
  boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.8)`,
  backgroundColor: '#fff',
};

export const FULL_OVERLAY_STYLE: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
};

export const FULL_CONTENT_STYLE: CSSProperties = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  padding: 0,
  border: 0,
  borderRadius: 0,
  backgroundColor: '#000',
};
