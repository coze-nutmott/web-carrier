import ButtonTab from 'common/component/ButtonTab';
import TestItem from 'shared/uiTest/component/TestItem';
import { useState } from 'react';
import SectionHeading from 'common/component/SectionHeading';

const AGE_RANGES = [
  {
    name: '10대',
    value: 'TARGET_10',
  },
  {
    name: '20대',
    value: 'TARGET_20',
  },
  {
    name: '30대',
    value: 'TARGET_30',
  },
  {
    name: '40대',
    value: 'TARGET_40',
  },
  {
    name: '50대 이상',
    value: 'TARGET_50_OVER',
  },
];

export default function TestButtonTab() {
  const defaultAgeRange = AGE_RANGES[1];
  const [ageRange, setAgeRange] = useState(defaultAgeRange);
  return (
    <TestItem title="ButtonTab">
      <SectionHeading className="mb-16" title="현판 랭킹" href="#">
        <ButtonTab
          menus={AGE_RANGES}
          currentMenu={ageRange}
          setCurrentMenu={setAgeRange}
        />
      </SectionHeading>
    </TestItem>
  );
}
