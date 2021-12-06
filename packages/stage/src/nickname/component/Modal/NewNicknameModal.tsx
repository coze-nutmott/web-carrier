import { useForm } from 'react-hook-form';

import Button from 'common/component/Button';
import Flex, { Column } from 'common/component/Flex';
import Input from 'common/component/Input';
import Modal from 'common/component/Modals/Modal';
import Text from 'common/component/Text';

interface IProps {
  close: () => void;
  onInputNickname: (nickname: string) => void; // eslint-disable-line no-unused-vars
}

export default function NewNicknameModal({ close, onInputNickname }: IProps) {
  const { register, handleSubmit } = useForm<{
    nickname: string;
  }>();

  const handleSubmitNickname = async (data: { nickname: string }) => {
    onInputNickname(data.nickname);
  };

  return (
    <Modal closeOutside={close}>
      <Flex as="form" onSubmit={handleSubmit(handleSubmitNickname)}>
        <Column className="px-24 pt-24 pb-32 w-full">
          <Text className="text-16 font-medium">새 닉네임 추가</Text>
          <Text className="mt-16 mb-8 text-14 font-normal text-black">
            닉네임
          </Text>
          <Flex className="rounded-2 border-1 border-solid border-diviceLine">
            <Input
              className="w-full h-40 bg-white resize-none outline-none rounded-0 border-0 border-[#cfcfcf]"
              name="nickname"
              placeholder="1자 이상 15자 이하"
              maxLength={15}
              ref={register({ required: true, maxLength: 15 })}
            />
          </Flex>
          <Text className="text-12 text-grayFont mt-4">
            여백, 특수문자는 사용이 불가합니다
          </Text>
          <Button
            className="mt-24"
            variant="primary"
            size="medium"
            type="submit"
          >
            확인
          </Button>
        </Column>
      </Flex>
    </Modal>
  );
}
