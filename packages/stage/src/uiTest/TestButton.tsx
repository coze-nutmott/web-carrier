import Button from 'common/component/Button';
import RoundButton from 'common/component/RoundButton';
import TestItem from 'shared/uiTest/component/TestItem';

export default function TestButton() {
  return (
    <TestItem title="Button">
      <Button
        variant="white"
        size="medium"
        className="mt-40 mr-auto flex-grow desktop:flex-none"
      >
        목록
      </Button>
      <Button variant="primary" className="mt-20 text-18">
        확인
      </Button>
      <Button variant="primary" size="medium" className="mt-24" type="submit">
        확인
      </Button>
      <Button variant="white" size="medium" className="mt-4 rounded-3 flex-1">
        취소
      </Button>
      <Button size="medium" className="mt-4">
        취소
      </Button>
      <RoundButton
        type="submit"
        className="text-12 rounded-20 mt-20"
        variant="primary"
        size="medium"
      >
        저장
      </RoundButton>
    </TestItem>
  );
}
