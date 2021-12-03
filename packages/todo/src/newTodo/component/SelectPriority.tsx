import { IPriority } from 'common/type';

import styles from './SelectPriority.module.scss';

interface IProps {
  priority: IPriority;
  setPriority: (priority: IPriority) => void;
}

export default function SelectPriority({ priority, setPriority }: IProps) {
  return (
    <div className={styles.priority}>
      {PRIORITY_LIST.map(item => (
        <button
          key={item}
          className={cn({ [styles.selected]: priority === item })}
          onClick={() => setPriority(item)}
        >
          {PRIORITY_LABEL[item]}
        </button>
      ))}
    </div>
  );
}

const PRIORITY_LIST: IPriority[] = ['high', 'middle', 'low'];
const PRIORITY_LABEL: { [key in IPriority]: string } = {
  high: '상',
  middle: '중',
  low: '하',
};
