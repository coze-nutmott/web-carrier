import { useState } from 'react';

import Button from 'common/component/Button';
import Flex from 'common/component/Flex';
import Modal from 'common/component/Modals/Modal';

interface IUseAlertReturn {
  alert: (message: string) => void; // eslint-disable-line no-unused-vars
  Alert: () => JSX.Element;
}

export default function useAlert(): IUseAlertReturn {
  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const alert = (message: string) => {
    setMsg(message);
    setIsOpen(true);
  };

  const handleOk = () => {
    setMsg('');
    setIsOpen(false);
  };

  const AlertModal: React.VFC = () => (
    <Modal closeOutside={() => setIsOpen(false)}>
      <div className="p-20">
        <div className="text-center pt-36 pb-50 text-18 text-gray30">{msg}</div>
        <Flex>
          <Button className="flex-1" variant="primary" onClick={handleOk}>
            확인
          </Button>
        </Flex>
      </div>
    </Modal>
  );

  const Alert = () => <>{isOpen && <AlertModal />}</>;

  return {
    alert,
    Alert,
  };
}
