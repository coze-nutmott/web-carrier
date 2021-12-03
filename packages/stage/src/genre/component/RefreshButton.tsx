import Flex from 'common/component/Flex';
import RefreshIcon from '@icons/icons-refresh-yellow.svg';
import Number from 'common/component/Number';

interface IProps {
  onClick: () => void;
  page: number;
  totalPage: number;
}

export default function RefreshButton({ onClick, page, totalPage }: IProps) {
  return (
    <Flex
      as="button"
      className="text-14 items-center justify-center border-1 border-solid border-[#cccccc] p-8"
      onClick={onClick}
    >
      <RefreshIcon />
      <span className="text-yellow font-bold ml-2">실시간 랭킹&nbsp;</span>
      <span>새로보기&nbsp;</span>
      <Number className="text-12">{page}</Number>
      <Number className="text-12 text-gray30">&nbsp;/ {totalPage}</Number>
    </Flex>
  );
}
