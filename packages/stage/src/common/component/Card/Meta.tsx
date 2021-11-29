import Divider from 'common/component/Divider';
import Number from 'common/component/Number';
import Ellipsis from 'common/component/Ellipsis';
import { Text } from 'common/component/shared';
import { INickname } from 'common/type';
import { numberToHuman } from 'common/util/numeric';

interface IProps {
  nickname: INickname;
  viewCount: number;
  favoriteCount: number;
  publishedEpisodeCount: number;
  genreName?: string;
}

export default function Meta({
  nickname,
  viewCount,
  favoriteCount,
  publishedEpisodeCount,
  genreName,
}: IProps) {
  return (
    <div className="flex flex-wrap desktop:mt-16 text-grayFont text-12 font-medium">
      <div className="flex flex-wrap order-1 desktop:order-none">
        <NumberWithLabel label="연재" number={publishedEpisodeCount} />
        <Divider className="text-gray80 mx-6 desktop:mx-8" />
        <NumberWithLabel label="조회" number={viewCount} />
        <Divider className="text-gray80 mx-6 desktop:mx-8" />
        <NumberWithLabel label="관심" number={favoriteCount} />
        {genreName && (
          <>
            <Divider className="text-gray80 mx-6 desktop:mx-8" />
            <Text variant="s12_medium_gray">{genreName}</Text>
          </>
        )}
        <Divider className="text-gray80 mx-6 desktop:mx-8 hidden desktop:inline" />
      </div>
      <div className="flex desktop:inline-flex flex-1-0-full desktop:flex-0-0-auto mb-4 desktop:mb-0 text-gray30 desktop:text-grayFont">
        <Ellipsis>{nickname.name}</Ellipsis>
        {(nickname.withdrawal || nickname.isDeleted) && (
          <span className="px-4 rounded-2 bg-divideArea flex-0-0-auto ml-4">
            탈퇴
          </span>
        )}
      </div>
    </div>
  );
}

const NumberWithLabel = ({
  label,
  number,
}: {
  label: string;
  number: number;
}) => (
  <Text variant="s12_medium_gray">
    {label}
    <Number className="ml-4">{numberToHuman(number)}</Number>
  </Text>
);
