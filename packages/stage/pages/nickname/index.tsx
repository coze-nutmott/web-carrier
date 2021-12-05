import SEO from 'common/component/SEO';
import Wrapper from 'common/component/Wrapper';
import Flex, { Column } from 'common/component/Flex';
import Button from 'common/component/Button';
import { useState } from 'react';
import { INickname } from 'common/type';
import { kRouter, Page } from 'common/util/kRouter';
import useFlash from 'common/hook/useFlash';

// export default NeedLoginRoute(ProfilePage);
export default function ProfilePage() {
  const { showSuccessMessage, showErrorMessage } = useFlash();
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   getValues,
  //   formState,
  //   reset,
  // } = useForm<ProfileFormValues>();
  const register = undefined; // tmp

  const [selectedNickname, setSelectedNickname] = useState<INickname>();

  const checkIfKakaopageNicknameAuthPending = () => {
    // return (
    //   selectedNickname?.kakaopageNicknameFlag &&
    //   authentication &&
    //   authentication.status === 'PENDING'
    // );
    return true; // temp
  };

  const handleClickProfileVerify = () => {
    if (checkIfKakaopageNicknameAuthPending()) {
      console.log('shoud verify');
      showErrorMessage('카카오페이지 작가 인증을 이미 신청했습니다.');
      return;
    }
    console.log('here');

    kRouter.routeTo({
      page: Page.NicknameVerify,
      id: selectedNickname?.id,
    });
  };

  return (
    <>
      <SEO title="닉네임">
        <meta name="tiara-pageName" content="닉네임" />
      </SEO>

      <Wrapper className="justify-center pt-92 mb-120">
        <Column className="w-330">
          <Flex className="justify-center">
            <input hidden name="profileId" ref={register} />
            {/*<Pro*/}
          </Flex>
          <Flex
            className="w-full pt-20 justify-center items-center"
            style={{
              paddingTop: selectedNickname?.kakaopageNicknameFlag
                ? '40px'
                : '20px',
            }}
          >
            <div className="relative">
              <Column>
                <Button
                  variant="white"
                  size="small"
                  onClick={handleClickProfileVerify}
                >
                  <div className="w-12 h-16 mr-8">{/*<KakaopageIco*/}</div>
                </Button>
              </Column>
            </div>
          </Flex>
        </Column>
      </Wrapper>
    </>
  );
}
