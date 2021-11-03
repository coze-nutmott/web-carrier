import React, { ComponentType, Fragment, useEffect, useState } from 'react';
import TestComponentButton from '../../uiTest/component/TestComponentButton';
import TestPage from '../../uiTest/component/TestPage';
import { SharedText } from '../../component/SharedText';
import { UI_TEST_PARAMS } from '../../component/SharedContainer';

interface IProps {
  testGroups: Array<{
    title: string;
    items: Array<{
      component: ComponentType;
      name: string;
    }>;
  }>;
  initialComponentName: string;
  routeTo: (url: string) => void;
}

export default function TestMain({
  testGroups,
  initialComponentName,
  routeTo,
}: IProps) {
  const [{ currentGroup, currentIndex }, setCurrentPos] = useState(() =>
    getPos(initialComponentName, testGroups),
  );
  useEffect(() => {
    setCurrentPos(getPos(initialComponentName, testGroups));
  }, [initialComponentName, testGroups]);

  const Component =
    currentGroup >= 0 && currentIndex >= 0
      ? testGroups[currentGroup].items[currentIndex].component
      : undefined;
  return (
    <div className={cn('my-20', 'px-15')}>
      <div>
        {!Component &&
          testGroups.map(({ title, items }, group) => (
            <Fragment key={group}>
              <SharedText
                variant={UI_TEST_PARAMS.labelTextVariant}
                className={cn('mb-10', { ['mt-20']: group > 0 })}
              >
                {title}
              </SharedText>
              <div>
                {items.map((item, index) => (
                  <TestComponentButton
                    key={index}
                    name={item.name}
                    onClickComponent={() => {
                      routeTo(`/dev?name=${item.name}`);
                      setCurrentPos({
                        currentGroup: group,
                        currentIndex: index,
                      });
                    }}
                  />
                ))}
              </div>
            </Fragment>
          ))}
      </div>
      {Component && (
        <TestPage
          goToList={() => {
            routeTo('/dev');
            setCurrentPos(INITIAL_POSITION);
          }}
        >
          <Component />
        </TestPage>
      )}
    </div>
  );
}

const INITIAL_POSITION = { currentGroup: -1, currentIndex: -1 };

function getPos(name: string, testGroups: IProps['testGroups']) {
  for (const group of testGroups) {
    for (const item of group.items) {
      if (item.name === name) {
        const currentGroup = testGroups.findIndex(
          group2 => group2.title === group.title,
        );
        const currentIndex = group.items.findIndex(
          item2 => item2.name === name,
        );
        return { currentGroup, currentIndex };
      }
    }
  }
  return INITIAL_POSITION;
}
