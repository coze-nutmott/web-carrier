import React from 'react';

import Flex, { Column } from 'common/component/Flex';
import Modal from 'common/component/Modals/Modal';
import ProfileImage from 'common/component/ProfileImage';
import Tag from 'common/component/Tab';
import Text from 'common/component/Text';
import { INickname } from 'common/type';

interface IProps {
  close: () => void;
  onSelected: (nickname: INickname) => void;
  nicknames: INickname[];
  currentNickname?: INickname;
}

export default function ProfileNicknameSelectModal({
  close,
  onSelected,
  nicknames,
  currentNickname,
}: IProps) {
  return (
    <Modal closeOutside={close} level="top">
      <Column className="p-24">
        <Text className="text-18 font-medium text-black">닉네임 설정</Text>

        <Text className="mt-4 mb-8 text-14 font-normal text-grayFont">
          수정할 닉네임을 선택해주세요.
        </Text>
        <Column>
          {nicknames &&
            nicknames.map(nickname => (
              <Flex
                key={nickname.id}
                className="ml-4 my-8 items-center cursor-pointer"
                onClick={() => onSelected(nickname)}
              >
                <ProfileImage
                  className="w-32 h-32 flex-shrink-0"
                  profile={nickname.profile}
                />

                <Text
                  className="ml-12 w-full text-16 text-black"
                  style={{
                    fontWeight:
                      nickname.id === currentNickname?.id ? 'bold' : 'normal',
                  }}
                >
                  <Flex>
                    <div>{nickname.name}</div>
                    {nickname.required && (
                      <Tag className="ml-8" variant="secondary">
                        대표
                      </Tag>
                    )}
                  </Flex>
                </Text>
              </Flex>
            ))}
        </Column>
      </Column>
    </Modal>
  );
}
