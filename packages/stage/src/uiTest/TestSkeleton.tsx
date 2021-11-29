import { Column } from 'common/component/Flex';
import Repeater from 'common/component/Repeater';
import Skeleton from 'common/component/Skeleton';
import Wrapper from 'common/component/Wrapper';
import TestItem from 'shared/uiTest/component/TestItem';

export default function TestSkeleton() {
  return (
    <TestItem title="Skeleton">
      <Wrapper className="mt-18 mb-18">
        <Column className="flex-grow">
          <div className="grid grid-cols-1 gap-x-64">
            <Repeater length={5}>
              <div className="py-17 desktop:py-24">
                <Skeleton
                  className="w-full h-110 mb-20 flex-row-reverse"
                  thumbnailClassName="w-80 h-122 ml-16"
                  lines={4}
                />
              </div>
            </Repeater>
          </div>
        </Column>
      </Wrapper>
    </TestItem>
  );
}
