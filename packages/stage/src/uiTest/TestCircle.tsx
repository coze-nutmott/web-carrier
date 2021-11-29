import Circle from 'common/component/Circle';
import TestItem from 'shared/uiTest/component/TestItem';
import KakaotalkIcon from '@icons/icons-kakaotalk.svg';
import FacebookIcon from '@icons/icons-facebook.svg';
import TwitterIcon from '@icons/icons-twitter.svg';

export default function TestCircle() {
  return (
    <TestItem title="Circle">
      <Circle style={{ backgroundColor: '#f9e000' }}>
        <KakaotalkIcon className="w-17 h-17" />
      </Circle>
      <Circle style={{ backgroundColor: '#3b599a' }}>
        <FacebookIcon className="w-17 h-17" />
      </Circle>
      <Circle style={{ backgroundColor: '#29ade3' }}>
        <TwitterIcon className="w-17 h-17" />
      </Circle>
    </TestItem>
  );
}
