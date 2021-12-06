import { useState, useRef, ChangeEvent, useEffect, HTMLProps } from 'react';

// import useFlash from '@/hooks/useFlash';
// import { uploadProfileImage } from '@/modules/nicknames/requests';
// import _File from '@/entities/File';

// import { ERROR_MESSAGES } from '@/helpers/errorMessage';

import useFlash from 'common/hook/useFlash';
import { IFile } from 'common/type';
import { uploadProfileImage } from 'nickname/state/callApi';

import DeleteIcon from '@/images/icons-delete.svg';
import ImageIcon from '@/images/icons-image.svg';
import PointIcon from '@/images/icons-point.svg';

interface IProps extends HTMLProps<HTMLDivElement> {
  defaultImage?: string;
  onChanged: (image: IFile | undefined) => void; // eslint-disable-line no-unused-vars
  onUpload?: (isUploading: boolean) => void; // eslint-disable-line no-unused-vars
}

export default function useProfileImageUploader({
  defaultImage,
  onChanged,
  onUpload,
}: IProps) {
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const flashMessage = useFlash();

  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage);
    } else {
      setImage('/images/img-dummy-profile.png');
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
    setImage('/images/img-dummy-profile.png');
    onChanged(undefined);
  };

  return {
    uploadImage,
    deleteImage,
    loading,
    image,
  };
}

interface ProfileImageUploaderProps {
  onChanged: (image: _File | undefined) => void;
  onUpload?: (isUploading: boolean) => void;
  defaultImage?: string;
}

const ProfileImageUploader: React.VFC<ProfileImageUploaderProps> = ({
  onChanged,
  onUpload,
  defaultImage,
}) => {
  const isDesktop = useMedia('desktop');
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    hiddenFileInput.current?.click();
    setShowMiniMenu(false);
  };

  const onImageSelected = (e: ChangeEvent<HTMLInputElement>) => {
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

  const onCancelCrop = () => {
    if (confirm('프로필 이미지 등록을 취소하시겠습니까?')) {
      clearHiddenFileInput();
      setSelectedFile(undefined);
    }
  };

  const onUploadComplete = (image: _File | undefined) => {
    clearHiddenFileInput();
    setSelectedFile(undefined);
    onChanged(image);
  };

  const { uploadImage, deleteImage, image } = useProfileImageUploader({
    defaultImage,
    onChanged: onUploadComplete,
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
        onChange={onImageSelected}
      />
      {showMiniMenu && (
        <Flex position="relative">
          <Box position="absolute" right="45px" zIndex={100}>
            <PointIcon />
          </Box>
          <Dropdown
            position="absolute"
            width="122px"
            top="15px"
            right="-9px"
            zIndex={1}
          >
            <Button variant="borderless" size="text" onClick={handleFileSelect}>
              <Flex fontSize="14px">
                <Box width="12px" height="12px" color="gray" mr={2}>
                  <ImageIcon />
                </Box>
                이미지 선택
              </Flex>
            </Button>
            {defaultImage && (
              <Button variant="borderless" size="text" onClick={deleteImage}>
                <Flex fontSize="14px">
                  <Box width="12px" height="12px" color="gray" mr={2}>
                    <DeleteIcon />
                  </Box>
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
          onCancel={onCancelCrop}
          smallCanvas={!isDesktop}
        />
      )}
    </div>
  );
};
