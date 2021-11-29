import Modal from 'common/component/Modals/Modal';

interface IProps {
  thumbnailUrl?: string;
  onClose: () => void;
}

export default function CoverZoomModal({ thumbnailUrl, onClose }: IProps) {
  return (
    <Modal
      closeOutside={onClose}
      width="332px"
      needCloseIcon={false}
      className="bg-transparent"
    >
      <div
        className="cursor-zoom-out text-center p-16"
        style={{ lineHeight: 0 }}
        onClick={onClose}
      >
        <img src={thumbnailUrl} alt="thumbnail" style={{ width: '100%' }} />
      </div>
    </Modal>
  );
}
