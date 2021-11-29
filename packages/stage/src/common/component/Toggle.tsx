import Flex from 'common/component/Flex';
import Number from 'common/component/Number';
import { ReactNode } from 'react';

interface IProps {
  isActive: boolean;
  onClick: () => void;
  labeled?: boolean;
  children?: ReactNode;
}
export default function Toggle({
  isActive,
  onClick,
  labeled = false,
  children,
}: IProps) {
  return (
    <div
      className={`relative h-16 rounded-8 cursor-pointer ${
        isActive ? 'bg-gray40' : 'bg-gray70'
      } ${labeled ? 'w-52' : 'w-41'}`}
      onClick={onClick}
    >
      {labeled && (
        <div
          className={`absolute text-10 ${
            isActive ? 'text-white left-9' : 'text-gray10 right-9'
          }`}
        >
          {isActive ? 'On' : 'Off'}
        </div>
      )}
      <Flex
        className={`justify-center items-center absolute w-26 h-26 rounded-1/2 ${
          isActive
            ? 'bg-yellow text-gray50 right-0'
            : 'bg-white text-gray10 left-0'
        }`}
        style={{ top: -5, boxShadow: '0 1px 12px 0 rgba(0,0,0,0.15)' }}
      >
        {children}
      </Flex>
    </div>
  );
}

/**
 * TODO
 * 사용하는 곳 없음
 */
export const AdultFilterToggle = ({ isActive, onClick }: IProps) => (
  <Toggle isActive={isActive} onClick={onClick} labeled>
    <Number className="text-11 font-normal">19</Number>
  </Toggle>
);
