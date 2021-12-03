import { IRoute } from 'common/type';
import { rankingPath } from 'common/util/routes';
import useRanking from 'genre/hook/useRanking';
import SectionHeading from 'common/component/SectionHeading';
import EmptyNovels from 'genre/component/EmptyNovels';
import Repeater from 'common/component/Repeater';
import Skeleton from 'common/component/Skeleton';
import RealTimePopularityCards from 'genre/component/RealTimePopularityCards';
import RefreshButton from 'genre/component/RefreshButton';
import usePagedRealtimeRank from 'genre/hook/usePagedRealtimeRank';

interface IProps {
  genre: IRoute;
}

const MAX_LENGTH = 6;

export const RealTimePopularityDesktop = ({ genre }: IProps) => {
  const { data, isLoading, isEmpty } = useRanking({
    genreIds: [genre.id],
    type: 'realtime',
  });
  const novels = data?.map(d => d.novel).slice(0, MAX_LENGTH);
  const realTimeUrl = rankingPath({
    genreIds: [genre.id],
    type: 'realtime',
  });
  return (
    <section className="col-1/-1 border-b-0 desktop:border-b-1 desktop:border-solid desktop:border-[#f0f0f0] pb-0 desktop:pb-60 mb-0 desktop:mb-14">
      <SectionHeading
        className="mb-16 desktop:mb-20"
        href={realTimeUrl}
        title="실시간 랭킹"
      />
      {isEmpty ? (
        <EmptyNovels height="267px" />
      ) : (
        <div className="grid desktop:grid-cols-3 gap-x-36 gap-y-20 desktop:gap-y-24">
          {isLoading && <Fallback />}
          <RealTimePopularityCards novels={novels} />
        </div>
      )}
    </section>
  );
};

export const RealTimePopularityMobile = ({ genre }: IProps) => {
  const realTimeUrl = rankingPath({
    genreIds: [genre.id],
    type: 'realtime',
  });

  const { isLoading, isEmpty, pagedNovels, page, totalPages, nextPage } =
    usePagedRealtimeRank(genre);

  const handleRefresh = () => {
    nextPage();
  };

  return (
    <section className="col-1/-1 border-b-0 desktop:border-b-1 border-solid border-[#f0f0f0] pb-0 desktop:pb-60 mb-0 desktop:mb-14">
      <SectionHeading
        className="mb-16 desktop:mb-20"
        title="실시간 랭킹"
        href={realTimeUrl}
      />
      {isEmpty ? (
        <EmptyNovels height="470px" />
      ) : (
        <div className="grid desktop:grid-cols-3 gap-x-36 gap-y-20 desktop:gap-y-24">
          {isLoading && <Fallback length={3} />}
          <RealTimePopularityCards novels={pagedNovels} />
          <RefreshButton
            onClick={handleRefresh}
            page={page}
            totalPage={totalPages}
          />
        </div>
      )}
    </section>
  );
};

export const Fallback = ({ length = 6 }: { length?: number }) => (
  <Repeater length={length}>
    <Skeleton
      className="w-full h-110"
      lines={4}
      thumbnailClassName="w-72 h-full mr-16"
    />
  </Repeater>
);
