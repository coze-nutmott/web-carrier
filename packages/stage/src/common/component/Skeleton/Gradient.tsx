import styles from 'common/component/Skeleton/Gradient.module.scss';

export default function Gradient() {
  return (
    <div className={cn('absolute z-1 left-0 w-80 h-full', styles.gradient)} />
  );
}
