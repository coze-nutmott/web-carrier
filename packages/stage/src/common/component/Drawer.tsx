import React, { Children, ReactNode } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import ExitIcon from '@icons/icons-exit.svg';
import useScrollLock from 'common/hook/useScrollLock';
import { ModalBackdrop } from 'common/component/Modals/Modal';
import Flex, { Column } from 'common/component/Flex';

// NOTE: 19세 작품 필터 비활성화
// import useAdultFilter from '@/hooks/useAdultFilter';
// import { AdultFilterToggle } from '@/components/Toggle';

interface IProps {
  onClose: () => void;
  children?: ReactNode;
}

export default function Drawer({ onClose, children }: IProps) {
  const modalRef = useRef(null);
  useScrollLock(modalRef);

  // NOTE: 19세 작품 필터 비활성화
  // const { isAdultOn, toggle } = useAdultFilter();

  const container = document.getElementById('modal-normal');
  const handleClose = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  return container
    ? createPortal(
        <ModalBackdrop ref={modalRef} onClick={handleClose}>
          <div className="bg-white absolute top-0 right-0 bottom-0 w-160 pt-65 pr-24 pb-32 pl-24">
            <Flex>
              {/* // NOTE: 19세 작품 필터 비활성화 */}
              {/* <Box position="absolute" top="20px" right="44px">
                <AdultFilterToggle isActive={isAdultOn} onClick={toggle} />
              </Box> */}
              <Flex
                className="absolute top-22 right-16 w-12 h-12 text-gray70"
                onClick={onClose}
              >
                <ExitIcon />
              </Flex>
            </Flex>

            <Column className="h-full items-center">
              {Children.map(
                Children.toArray(children).filter(Boolean),
                child => (
                  <Flex className="w-full mb-24 text-18 items-center justify-center font-medium">
                    {child}
                  </Flex>
                ),
              )}
            </Column>
          </div>
        </ModalBackdrop>,
        container,
      )
    : null;
}
