export * from 'common/style/color';
import * as color from 'common/style/color';

/**
 * 주요 포인트
 * 모든 색상은 common/style/color 에 정의해서 사용합니다
 * 모든 scss 파일에서는 위 color 파일을 통해 색상 정보를 입력할 수 있습니다
 * 자바스크립트에서는 val.black 과 같은 형식으로 입력할 수 있습니다
 * 참고로 val 는 전역 객체입니다
 */
export type IColor = keyof typeof color;
