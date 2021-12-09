import styles from './variable.module.scss';

/**
 * 주요 포인트
 * 10 보다 큰 z-index 값은 ZIndex 를 통해 입력합니다
 * 10 이하의 z-index 값은 자유롭게 입력할 수 있습니다
 */
export const ZIndex = {
  Loading: Number(styles.Z_INDEX_LOADING),
  Modal: Number(styles.Z_INDEX_MODAL),
  PointIcon: Number(styles.Z_INDEX_POINT_ICON),
  Toast: Number(styles.Z_INDEX_TOAST),
  SelectDropdown: Number(styles.Z_INDEX_SELECT_DROPDOWN),
};
