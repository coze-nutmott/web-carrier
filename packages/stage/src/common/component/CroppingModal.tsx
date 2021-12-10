import { useState, useEffect, useCallback } from 'react';

import { fabric } from 'fabric';

import Button from 'common/component/Button';
import Flex from 'common/component/Flex';
import Modal from 'common/component/Modals/Modal';
import { fileToDataURL } from 'common/util/image';

const IMAGE_OPTION: Partial<fabric.Image> = {
  transparentCorners: false,
  borderScaleFactor: 2,
  borderColor: '#FE06C0',
  cornerColor: '#FE06C0',
  cornerStrokeColor: '#ffffff',
  cornerSize: 14,
  cornerStyle: 'circle',
};

interface IProps {
  file?: File; // not IFile
  onCancel: () => void;
  onComplete: (dataUrl: string) => void;
  smallCanvas?: boolean;
}

export default function CroppingModal({
  file,
  onComplete,
  onCancel,
  smallCanvas = false,
}: IProps) {
  const width = smallCanvas ? 300 : 400;
  const height = smallCanvas ? 300 : 400;

  const [canvas, setCanvas] = useState<fabric.Canvas>();

  useEffect(() => {
    const c = new fabric.Canvas('profile', {
      backgroundColor: 'white',
    });
    setCanvas(c);
  }, [setCanvas]);

  useEffect(() => {
    async function loadFileToCanvas() {
      if (!file || !canvas) return;
      const result = await fileToDataURL(file);
      fabric.Image.fromURL(result, img => {
        img.selectable = true;
        img.scaleToHeight(height);
        img.scaleToWidth(width);
        img.set(IMAGE_OPTION);
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    }
    loadFileToCanvas();
  }, [file, canvas, width, height]);

  const handleConfirm = () => {
    if (canvas) {
      const data = canvas.toDataURL({
        format: 'jpeg',
        quality: 1,
      });
      onComplete(data);
    }
  };

  return (
    <Modal width="600px" closeOutside={onCancel}>
      <div>
        <div className="pt-12 px-20 pb-16 desktop:py-24 desktop:px-30">
          <div className="text-20 desktop:text-24 font-bold m-0">
            프로필 이미지 편집
          </div>
        </div>

        <Flex className="border-t-1 border-b-1 border-solid border-divideLine bg-divideArea justify-center p-20">
          <div className="relative border-1 border-solid border-divideLine bg-white overflow-hidden">
            <canvas id="profile" width={width} height={height} />
          </div>
        </Flex>

        <Flex className="p-24 justify-between">
          <Button variant="white" onClick={onCancel}>
            취소
          </Button>
          <Button variant="tertiary" onClick={handleConfirm}>
            완료
          </Button>
        </Flex>
      </div>
    </Modal>
  );
}
