import { isAxiosError } from 'common/util/axios';

export const ERROR_MESSAGES = {
  DEFAULT: '작업에 실패했습니다. 네트워크 상태를 확인해주세요.',
  FAIL_TO_SAVE: '내용 저장에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_DELETE: '삭제하지 못했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_CREATE_COMMENT:
    '댓글 등록에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_UPLOAD_IMAGE:
    '이미지 파일 업로드에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_UPLOAD_FILE:
    '파일 업로드에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_UPLOAD_COVER:
    '작품 표지 등록에 실패하였습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_CHANGE_PASSWORD:
    '비밀번호 변경에 실패했습니다. 네트워크 상태를 확인해주세요.',
  FAIL_TO_BOOKMARK:
    '관심 작품 설정에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_SEND_TALK:
    '메시지 발송에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_SAVE_PROFILE:
    '프로필 정보 저장에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_VOTE: '투표에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_DELETE_EPISODE:
    '회차 삭제가 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_UNPUBLISH_EPISODE:
    '회차 등록 취소에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_CREATE_NOVEL:
    '작품 등록에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_SAVE_NOVEL:
    '작품 정보 저장에 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_DELETE_NOVEL:
    '작품 삭제가 실패했습니다. 네트워크 환경을 확인해주세요.',
  FAIL_TO_APPLY_CONTEST:
    '공모전 참가 등록이 실패했습니다. 네트워크 환경을 확인하세요.',
  CANNOT_DELETE_CP_NOVEL: 'CP등록작품은 삭제할 수 없습니다.',
};

export function errorMessage(
  error: unknown,
  defaultMessage = ERROR_MESSAGES.DEFAULT,
): string {
  if (isAxiosError(error)) {
    return error.response?.data.stageErrorMessage || defaultMessage;
  }
  return defaultMessage;
}
