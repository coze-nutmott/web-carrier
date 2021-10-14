export * from 'common/style/textVariant';
import * as textVariant from 'common/style/textVariant';
export * from 'common/style/buttonVariant';
import * as buttonVariant from 'common/style/buttonVariant';

/**
 * 주요 포인트
 * 버튼과 텍스트 스타일은 모두 textVariant, buttonVariant 를 통해 정의해서 사용합니다
 * 보통은 Text, ButtonText 컴포넌트로 충분하지만 필요한 경우 st.s16_regular_black 과 같은 형식으로 클래스명을 입력할 수 있습니다
 * 참고로 st 는 전역 객체입니다
 */
export type ITextVariant = keyof typeof textVariant;
export type IButtonVariant = keyof typeof buttonVariant;
