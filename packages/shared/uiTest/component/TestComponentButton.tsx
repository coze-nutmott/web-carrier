import { SharedTextButton } from '../../component/SharedTextButton';
import React from 'react';
import { UI_TEST_PARAMS } from '../../component/SharedContainer';

interface IProps {
  name: string;
  onClickComponent: () => void;
}

export default function TestComponentButton({
  name,
  onClickComponent,
}: IProps) {
  const index = name.indexOf('Test');
  const label = name.substr(index + 4);
  return (
    <SharedTextButton
      variant={UI_TEST_PARAMS.buttonVariant}
      textVariant={UI_TEST_PARAMS.buttonTextVariant}
      height="50px"
      onClick={() => onClickComponent()}
      className="m-5"
    >
      {label}
    </SharedTextButton>
  );
}
