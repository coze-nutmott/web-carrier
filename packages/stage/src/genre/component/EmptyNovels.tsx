import { Column } from 'common/component/Flex';
import StageIcon from '@icons/icons-stage.svg';

interface IProps {
  height: string;
}
export default function EmptyNovels({ height = '100%' }: IProps) {
  return (
    <Column
      className="justify-center items-center bg-[#F6F6F6] text-grayFont text-14"
      style={{ height }}
    >
      <div>
        <StageIcon />
      </div>
      조건에 맞는 작품이 없습니다.
    </Column>
  );
}
