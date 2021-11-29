import Dropdown from 'common/component/Dropdown';
import { useState } from 'react';
import TestItem from 'shared/uiTest/component/TestItem';
import MoreIcon from '@icons/icons-more.svg';
import DeclarationIcon from '@icons/icons-declaration.svg';
import TrashIcon from '@icons/icons-trashcan.svg';

const OPTIONS = [
  {
    Icon: TrashIcon,
    text: '삭제',
    handler: () => {},
  },
  {
    Icon: DeclarationIcon,
    text: '신고',
    handler: () => {},
  },
];

export default function TestDropdown() {
  const [showActions, setShowActions] = useState<boolean>(false);
  return (
    <TestItem title="Dropdown">
      <button onClick={() => setShowActions(_ => !_)}>
        <div className="w-20 h-20 ml-auto text-secondary">
          <MoreIcon />
        </div>
      </button>
      {showActions && (
        <Dropdown onClose={() => setShowActions(false)}>
          {OPTIONS.map(({ text, handler, Icon }) => (
            <button key={text} onClick={handler}>
              <div className="flex text-secondary items-center">
                <div className="flex w-14 h-14 mr-2">
                  <Icon />
                </div>
                {text}
              </div>
            </button>
          ))}
        </Dropdown>
      )}
    </TestItem>
  );
}
