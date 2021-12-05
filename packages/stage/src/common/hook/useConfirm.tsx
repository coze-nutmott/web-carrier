import React, { useState } from 'react';

import KakaopageIcon from '@icons/icons-brand-kakaopage.svg';
import TrashIcon from '@icons/icons-trashcan.svg';

import Button from 'common/component/Button';
import Flex from 'common/component/Flex';
import Modal from 'common/component/Modals/Modal';
import useMedia from 'common/hook/useMedia';

interface IConfirmOptions {
  icon?: 'TRASH' | 'KAKAOPAGE';
  confirmLabel: string;
  cancelLabel: string;
}

// TODO: COZE: how to solve unused-vars error?
interface IUseConfirmReturn {
  confirm: (
    message: string, // eslint-disable-line no-unused-vars
    options?: Partial<IConfirmOptions>, // eslint-disable-line no-unused-vars
  ) => Promise<boolean>;
  Confirm: () => JSX.Element;
}

let conf: (value: boolean) => void; // eslint-disable-line no-unused-vars

const defaultOptions: IConfirmOptions = {
  confirmLabel: '확인',
  cancelLabel: '취소',
};

export default function useConfirm(): IUseConfirmReturn {
  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState(defaultOptions);

  const confirm = (message: string, options?: Partial<IConfirmOptions>) => {
    setModalOptions({
      ...defaultOptions,
      ...options,
    });
    setMsg(message);
    setIsOpen(true);

    return new Promise<boolean>(resolve => {
      conf = resolve;
    });
  };

  const handleOk = () => {
    setMsg('');
    setIsOpen(false);
    conf(true);
  };

  const handleCancel = () => {
    setMsg('');
    setIsOpen(false);
    conf(false);
  };

  const AlertModal: React.VFC = () => {
    const isDesktop = useMedia('desktop');

    const Icon = () => {
      switch (modalOptions.icon) {
        case 'TRASH':
          return <TrashIcon />;
        case 'KAKAOPAGE':
          return <KakaopageIcon />;
        default:
          return null;
      }
    };

    return (
      <Modal
        closeOutside={handleCancel}
        width="502px"
        fixBottom={!isDesktop}
        needCloseIcon={false}
      >
        <div className="px-30 pt-44 pb-30">
          <div className="text-center">
            <Icon />
            <div className="mt-16">
              {msg.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
          <Flex className="mt-30 desktop:mt-40">
            <Button className="flex-1 mr-8" onClick={handleCancel}>
              {modalOptions.cancelLabel}
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleOk}>
              {modalOptions.confirmLabel}
            </Button>
          </Flex>
        </div>
      </Modal>
    );
  };

  const Confirm = () => <>{isOpen && <AlertModal />}</>;

  return {
    confirm,
    Confirm,
  };
}
