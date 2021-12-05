import { useEffect, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import KakaopageIcon from '@icons/icons-brand-kakaopage.svg';
import DownIcon from '@icons/icons-dropdown-down.svg';
import InfoIcon from '@icons/icons-information.svg';

import useQueryParameter, {
  getStringOptional,
} from 'shared/hook/useQueryParameter';

import Button from 'common/component/Button';
import Flex, { Column } from 'common/component/Flex';
import Input from 'common/component/Input';
import Label from 'common/component/Label';
import SEO from 'common/component/SEO';
import Text from 'common/component/Text';
import Wrapper from 'common/component/Wrapper';
import useConfirm from 'common/hook/useConfirm';
import useFlash from 'common/hook/useFlash';
import { IErrorResponse, INickname, IProfileFormValues } from 'common/type';
import { isAxiosError } from 'common/util/axios';
import { ERROR_MESSAGES } from 'common/util/errorMessage';
import { kRouter, Page } from 'common/util/kRouter';
import useKakaopageNickname from 'nickname/hook/useKakaopageNickname';
import useMyNicknames from 'nickname/hook/useMyNicknames';
import usePossibleNewNickname from 'nickname/hook/usePossibleNewNickname';
import {
  createNickname,
  getDuplicate,
  removeNickname,
  updateNickname,
} from 'nickname/state/callApi';

interface IQuery {
  fromWorkshop: string;
}

// export default NeedLoginRoute(ProfilePage);
export default function ProfilePage() {
  // const { Alert, alert } = useAlert();
  const { confirm, Confirm } = useConfirm();

  const param = useQueryParameter<IQuery>([
    { name: 'fromWorkshop', getter: getStringOptional },
  ]);
  const fromWorkshop = param.query.fromWorkshop;

  const { showSuccessMessage, showErrorMessage } = useFlash();
  const { register, handleSubmit, setValue, getValues, formState, reset } =
    useForm<IProfileFormValues>();

  const isFormDirty = formState.isDirty;

  // useConfirmRouteChangeIf(isFormDirty, () => {
  //   return confirmChangeIsNotSaved();
  // });

  const [showProfileNicknameSelectModal, setShowProfileNicknameSelectModal] =
    useState(false);
  const [showNewNicknameModal, setShowNewNicknameModal] = useState(false);

  const [profileImageUrl, setProfileImageUrl] = useState<string>();

  const [selectedNickname, setSelectedNickname] = useState<INickname>();
  const { authentication } = useKakaopageNickname(
    selectedNickname?.kakaopageNicknameFlag ? selectedNickname.id : undefined,
  );

  const { myNicknames, revalidate } = useMyNicknames();
  const { canCreateNewNickname, revalidate: revalidateCount } =
    usePossibleNewNickname();

  const setNicknameFormValue = useCallback(
    (nickname: INickname | undefined) => {
      setValue('nickname', nickname?.name || ''); // TODO: COZE: remove fallback same as original project
      setValue('profileId', nickname?.profile?.id.toString());
      setProfileImageUrl(nickname?.profile?.url);
    },
    [setValue],
  );

  useEffect(() => {
    const setProfilePage = (nickname: INickname | undefined) => {
      setNicknameFormValue(nickname);
      setSelectedNickname(nickname);
    };

    //페이지 최초 진입 시 기본 닉네임 설정
    if (myNicknames && myNicknames.length >= 1 && !selectedNickname) {
      const requiredNick = myNicknames.find(
        nickname => nickname.required === true,
      );

      setProfilePage(requiredNick);
    }

    //새로 생성/변경한 닉네임의 작가 닉네임 신청 상태 갱신
    if (myNicknames && selectedNickname) {
      const newNickname = myNicknames.find(
        nickname => nickname.id === selectedNickname.id,
      );

      if (
        newNickname?.kakaopageNicknameFlag !==
        selectedNickname?.kakaopageNicknameFlag
      ) {
        setProfilePage(newNickname);
      }
    }
  }, [myNicknames]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNicknameSelected = (nickname: INickname) => {
    setSelectedNickname(nickname);
    setNicknameFormValue(nickname);
  };

  const handleNicknameChange = () => {
    if (
      getValues('nickname') !== selectedNickname?.name &&
      isFormDirty &&
      !confirmChangeIsNotSaved()
    )
      return;
    selectedNickname?.type !== 'ADMIN' &&
      setShowProfileNicknameSelectModal(true);
  };

  const createNewNickname = async (
    isKakaopageNickname: boolean,
    nickname: string,
  ) => {
    try {
      const resNickname = await createNickname(nickname, isKakaopageNickname);
      handleNicknameSelected(resNickname);
      setShowNewNicknameModal(false);
      if (isKakaopageNickname) {
        showSuccessMessage(
          '랜덤으로 생성된 닉네임이 설정되었습니다. 닉네임 메뉴에서 카카오페이지 작가 인증 버튼을 클릭하여 작가 인증을 진행해주세요.',
        );
      } else {
        showSuccessMessage('닉네임이 등록되었습니다.');
      }
      revalidateCount();
      revalidate();

      if (fromWorkshop) {
        const message =
          fromWorkshop === 'new'
            ? '해당 창을 닫고 새 작품 등록 화면으로 돌아가서 계속 작품을 등록해주세요.'
            : '해당 창을 닫고 작품 정보 수정 화면으로 돌아가서 계속 작품 정보를 수정해주세요.';

        alert(message);
      }
    } catch (error) {
      showErrorMessage(error, ERROR_MESSAGES.FAIL_TO_SAVE_PROFILE);
    }
  };

  const updateRequestNickname = async (
    isKakaopageNickname: boolean,
    formValue: IProfileFormValues,
  ) => {
    if (selectedNickname) {
      try {
        const resNickname = await updateNickname(
          selectedNickname?.id,
          isKakaopageNickname,
          formValue.nickname,
          formValue.profileId,
        );
        if (isKakaopageNickname) {
          showSuccessMessage(
            '랜덤으로 생성된 닉네임이 설정되었습니다. 닉네임 메뉴에서 카카오페이지 작가 인증 버튼을 클릭하여 작가 인증을 진행해주세요.',
          );
        } else {
          showSuccessMessage('저장되었습니다.');
        }

        revalidate();
        handleNicknameSelected(resNickname);
        reset({
          nickname: resNickname.name,
          profileId: resNickname.profile?.id.toString(),
        });
        // dispatch(initializeSession());
      } catch (error) {
        showErrorMessage(error);
      }
    }
  };

  const deleteNickname = async () => {
    if (selectedNickname) {
      try {
        await removeNickname(selectedNickname.id);
        showSuccessMessage('선택한 닉네임이 삭제되었습니다.');
        setSelectedNickname(undefined);
        revalidate();
        revalidateCount();
      } catch (error) {
        if (isAxiosError(error)) {
          const response = error?.response?.data as IErrorResponse;
          if (response?.stageErrorCode === 'NICKNAME_107') {
            alert(response.stageErrorMessage);
            return;
          }
        }

        showErrorMessage(error);
      }
    }
  };

  const checkNickname = async (
    { nickname, profileId }: IProfileFormValues,
    isCreate: boolean,
  ) => {
    if (nickname.length < 1 || nickname.length > 15) {
      showErrorMessage(
        '닉네임은 1자 이상 15자 이하의 텍스트만 지정 가능합니다.',
      );
      return;
    }

    if (selectedNickname?.name !== nickname) {
      try {
        const res = await getDuplicate(nickname);

        if (selectedNickname?.type === 'USER') {
          if (!res.valid && res.duplicatedStageNickname) {
            showErrorMessage(
              '이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.',
            );
            return;
          }

          if (!res.valid && res.duplicatedKakaopageNickname) {
            if (
              await confirm(
                '카카오페이지에 등록된 작가명은 별도의 본인 인증 절차를 통해 스테이지 닉네임으로 사용 가능합니다. 계속하시겠습니까?',
                { icon: 'KAKAOPAGE' },
              )
            ) {
              if (isCreate) {
                createNewNickname(true, nickname);
              } else {
                updateRequestNickname(true, { nickname, profileId });
              }
            }
            return;
          }
        }

        if (
          selectedNickname?.type === 'CP' ||
          selectedNickname?.type === 'ADMIN'
        ) {
          if (!res.valid) {
            showErrorMessage(
              '이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.',
            );
            return;
          }

          if (res.valid && res.duplicatedStageNickname) {
            if (
              await confirm(
                '현재 다른 유저도 이용하고 있는 닉네임입니다.\n해당 닉네임을 사용하는 유저(작가님)와 협의 후 사용 바랍니다.',
              )
            ) {
              if (isCreate) {
                createNewNickname(false, nickname);
              } else {
                updateRequestNickname(false, { nickname, profileId });
              }
            }
            return;
          }
        }
      } catch (error) {
        showErrorMessage(error);
      }
    }

    if (isCreate) {
      createNewNickname(false, nickname);
    } else {
      updateRequestNickname(false, { nickname, profileId });
    }
  };

  const handleNickname: SubmitHandler<IProfileFormValues> = async data => {
    const checkRegExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (selectedNickname?.type === 'CP' && selectedNickname?.required) {
      //NOTE Input disabled 조건으로 데이터 추가 필요
      data.nickname = selectedNickname.name;
      updateRequestNickname(false, data);
      return;
    }

    if (!checkRegExp.test(data.nickname)) {
      showErrorMessage('사용할 수 없는 닉네임입니다.');
    } else {
      checkNickname(data, false);
    }
  };

  const handleClickNewNickname = () => {
    if (isFormDirty && !confirmChangeIsNotSaved()) return;
    setShowNewNicknameModal(true);
  };

  const checkIfKakaopageNicknameAuthReady = () => {
    return (
      selectedNickname?.kakaopageNicknameFlag &&
      authentication &&
      authentication.status === 'READY'
    );
  };

  const checkIfKakaopageNicknameAuthPending = () => {
    return (
      selectedNickname?.kakaopageNicknameFlag &&
      authentication &&
      authentication.status === 'PENDING'
    );
  };

  const handleClickProfileVerify = () => {
    if (checkIfKakaopageNicknameAuthPending()) {
      showErrorMessage('카카오페이지 작가 인증을 이미 신청했습니다.');
      return;
    }

    kRouter.routeTo({
      page: Page.NicknameVerify,
      id: selectedNickname?.id,
    });
  };

  const handleProfileVerifyCancel = async () => {
    if (!authentication) return;

    try {
      // await deleteKakaopageAuthentication(authentication.id);
      revalidate();
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const handleClickProfileVerifyCancel = async () => {
    if (
      await confirm(
        '카카오페이지 작가 인증 신청을 취소합니다.\n계속하시겠습니까?',
      )
    ) {
      handleProfileVerifyCancel();
    }
  };

  const handleDeleteNickname = async () => {
    if (
      await confirm(
        '닉네임을 삭제하시더라도\n해당 닉네임으로 작성된 댓글은 삭제되지 않습니다.\n계속하시겠습니까?',
      )
    ) {
      deleteNickname();
    }
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
            {/*<ProfileImageUploader*/}
            {/*  onChanged={(image: File | undefined) => {*/}
            {/*    setValue('profileId', image?.id.toString(), {*/}
            {/*      shouldDirty: true,*/}
            {/*    });*/}
            {/*    setProfileImageUrl(image?.url);*/}
            {/*  }}*/}
            {/*  defaultImage={profileImageUrl}*/}
            {/*/>*/}
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
                  variant="borderless"
                  onClick={() => {
                    handleNicknameChange();
                  }}
                >
                  <Text className="text-black text-24 font-bold">
                    {selectedNickname?.name}
                  </Text>
                  <div className="text-secondary">
                    <DownIcon width="16px" height="16px" />
                  </div>
                </Button>

                {selectedNickname?.kakaopageNicknameFlag && (
                  <Button
                    variant="white"
                    size="small"
                    onClick={handleClickProfileVerify}
                  >
                    <div className="w-12 h-16 mr-8">
                      <KakaopageIcon />
                    </div>
                    <Text className="text-grayFont font-14">
                      카카오페이지 작가 인증
                    </Text>
                  </Button>
                )}
              </Column>
            </div>
          </Flex>
          <Column
            as="form"
            className="pt-24 flex-col"
            onSubmit={handleSubmit(handleNickname)}
          >
            <Label htmlFor="nickname" className="font-bold text-14 mb-8">
              닉네임
            </Label>
            <Input
              placeholder="1자 이상 15자 이하"
              name="nickname"
              disabled={
                selectedNickname?.type === 'CP' && selectedNickname?.required
              }
              ref={register({ required: true })}
            />
            {checkIfKakaopageNicknameAuthReady() && (
              <Text className="mt-8 text-12 text-grayFont">
                랜덤으로 생성된 닉네임이 설정되어 있습니다. 카카오페이지 작가
                인증을 진행해주세요.&nbsp; 인증이 완료되면, 신청하신&nbsp;
                <Text className="inline text-12 font-bold text-navy underline">
                  {authentication?.kakaopageNickname.name}
                </Text>
                &nbsp;닉네임을 사용하실 수 있습니다.&nbsp;
                <Text
                  as="a"
                  className="inline mt-16 text-12 text-grayFont cursor-pointer underline"
                  onClick={handleClickProfileVerifyCancel}
                >
                  인증 취소하기
                </Text>
              </Text>
            )}
            {checkIfKakaopageNicknameAuthPending() && (
              <Text className="mt-8 text-12 text-grayFont">
                카카오페이지 작가 인증을 진행중입니다. 인증이 완료되면,
                신청하신&nbsp;
                <Text className="inline text-12 font-bold text-navy underline">
                  {authentication?.kakaopageNickname.name}
                </Text>
                &nbsp;닉네임을 사용하실 수 있습니다.&nbsp;
                <Text
                  as="a"
                  className="inline mt-16 text-12 text-grayFont cursor-pointer underline"
                  onClick={handleProfileVerifyCancel}
                >
                  인증 취소하기
                </Text>
              </Text>
            )}

            {selectedNickname?.type === 'CP' && selectedNickname?.required && (
              <Text
                as="a"
                className="mt-8 text-12 text-grayFont cursor-pointer underline"
                onClick={() =>
                  alert(
                    '파트너 회원의 기본 닉네임은 수정하실 수 없습니다. 수정을 원하시는 경우 고객센터로 문의해주세요.',
                  )
                }
              >
                닉네임 변경 안내
              </Text>
            )}

            <Button
              variant={isFormDirty ? 'primary' : 'disabled'}
              disabled={!isFormDirty}
              type="submit"
              className="mt-24"
            >
              저장
            </Button>

            {canCreateNewNickname && (
              <Button
                variant="tertiary"
                className="mt-2"
                onClick={handleClickNewNickname}
              >
                새 닉네임 추가
              </Button>
            )}
            <Button
              variant="borderless"
              className="mt-2"
              onClick={() => kRouter.routeBack()}
            >
              취소
            </Button>
            {!canCreateNewNickname && (
              <Flex className="mt-16 justify-center">
                <div className="text-grayFont mr-1">
                  <InfoIcon width="12px" height="12px" />
                </div>
                <Flex className="text-grayFont text-14 align-center">
                  닉네임은 최대 6개까지 등록할 수 있습니다.
                </Flex>
              </Flex>
            )}

            {!selectedNickname?.required && (
              <Flex className="justify-center">
                <Text
                  as="a"
                  className="mt-16 text-12 text-grayFont cursor-pointer underline"
                  onClick={handleDeleteNickname}
                >
                  닉네임 삭제
                </Text>
              </Flex>
            )}
          </Column>
        </Column>
      </Wrapper>
    </>
  );
}

function confirmChangeIsNotSaved() {
  // eslint-disable-next-line no-alert
  return window.confirm('입력한 내용이 저장되지 않습니다. 계속하시겠습니까?');
}
