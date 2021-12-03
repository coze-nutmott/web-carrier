import React, { ReactNode } from 'react';

import { UI_TEST_PARAMS } from '../../component/SharedContainer';
import { SharedText } from '../../component/SharedText';
import styles from './TestItem.module.scss';

interface IProps {
  title: string;
  children?: ReactNode;
}

export default function TestItem({ title, children }: IProps) {
  return (
    <div className={cn(styles.testItem, 'mt-20', 'p-10')}>
      <SharedText
        variant={UI_TEST_PARAMS.labelTextVariant}
        className={cn('w-full', 'mb-10')}
      >
        {title}
      </SharedText>
      {children}
    </div>
  );
}
