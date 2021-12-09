import { useState, useRef, ChangeEvent, useEffect } from 'react';

import DeleteIcon from '@icons/icons-delete.svg';
import ImageIcon from '@icons/icons-image.svg';
import PointIcon from '@icons/icons-point.svg';

import Button from 'common/component/Button';
import CroppingModal from 'common/component/CroppingModal';
import Dropdown from 'common/component/Dropdown';
import Flex from 'common/component/Flex';
import Placeholder from 'common/component/Placeholder';
import useFlash from 'common/hook/useFlash';
import useMedia from 'common/hook/useMedia';
import { ZIndex } from 'common/style/variable';
import { IFile } from 'common/type';
import { ERROR_MESSAGES } from 'common/util/errorMessage';
import { uploadProfileImage } from 'nickname/state/server';

interface IProps {
  onChanged: (image: IFile | undefined) => void;
  onUpload?: (isUploading: boolean) => void;
  defaultImage?: string;
}

export default function ProfileImageUploader({
  onChanged,
  onUpload,
  defaultImage,
}: IProps) {
  const isDesktop = useMedia('desktop');
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    hiddenFileInput.current?.click();
    setShowMiniMenu(false);
  };

  const handleImageSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const clearHiddenFileInput = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = '';
    }
  };

  const handleCancelCrop = () => {
    if (confirm('프로필 이미지 등록을 취소하시겠습니까?')) {
      clearHiddenFileInput();
      setSelectedFile(undefined);
    }
  };

  const handleUploadComplete = (image: IFile | undefined) => {
    clearHiddenFileInput();
    setSelectedFile(undefined);
    onChanged(image);
  };

  const { uploadImage, deleteImage, image } = useProfileImageUploader({
    defaultImage,
    onChanged: handleUploadComplete,
    onUpload,
  });

  return (
    <div>
      <Placeholder onClick={() => setShowMiniMenu(prev => !prev)} src={image} />
      <input
        hidden
        ref={hiddenFileInput}
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageSelected}
      />
      {showMiniMenu && (
        <Flex className="relative">
          <div
            className="absolute right-45"
            style={{ zIndex: ZIndex.PointIcon }}
          >
            <PointIcon />
          </div>
          <Dropdown className="absolute w-122 top-15 -right-9 z-1">
            <Button variant="borderless" size="text" onClick={handleFileSelect}>
              <Flex className="text-14">
                <div className="w-12 h-12 text-gray mr-2">
                  <ImageIcon />
                </div>
                이미지 선택
              </Flex>
            </Button>
            {defaultImage && (
              <Button variant="borderless" size="text" onClick={deleteImage}>
                <Flex className="text-14">
                  <div className="w-12 h-12 text-gray mr-2">
                    <DeleteIcon />
                  </div>
                  이미지 삭제
                </Flex>
              </Button>
            )}
          </Dropdown>
        </Flex>
      )}
      {selectedFile && (
        <CroppingModal
          file={selectedFile}
          onComplete={uploadImage}
          onCancel={handleCancelCrop}
          smallCanvas={!isDesktop}
        />
      )}
    </div>
  );
}

interface IUseProfileImageUploaderParams {
  defaultImage?: string;
  onChanged: (image: IFile | undefined) => void;
  onUpload?: (isUploading: boolean) => void;
}

function useProfileImageUploader({
  defaultImage,
  onChanged,
  onUpload,
}: IUseProfileImageUploaderParams) {
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const flashMessage = useFlash();

  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage);
    } else {
      setImage('/static/images/img-dummy-profile.png');
    }
  }, [defaultImage]);

  const onLoading = (isLoading: boolean) => {
    setLoading(isLoading);
    onUpload && onUpload(isLoading);
  };

  const uploadImage = async (dataUrl: string) => {
    onLoading(true);
    try {
      const res = await uploadProfileImage(dataUrl);
      setImage(res.url);
      onChanged(res);
    } catch (error) {
      flashMessage.showErrorMessage(error, ERROR_MESSAGES.FAIL_TO_UPLOAD_IMAGE);
    } finally {
      onLoading(false);
    }
  };

  const deleteImage = () => {
    setImage('/static/images/img-dummy-profile.png');
    onChanged(undefined);
  };

  return {
    uploadImage,
    deleteImage,
    loading,
    image,
  };
}
