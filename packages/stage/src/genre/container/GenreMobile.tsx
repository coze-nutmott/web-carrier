import { IRoute } from 'common/type';
import Grid from 'common/component/Grid';
import { Column } from 'common/component/Flex';
import TopBannerCarousel from 'genre/component/TopBannerCarousel';
import Ranking from 'genre/component/Ranking';
import BottomBannerCarousel from 'genre/component/BottomBannerCarousel';
import Latest from 'genre/component/Latest';
import { RealTimePopularityMobile } from 'genre/component/RealTimePopularity';
import NewSeries from 'genre/component/NewSeries';
import AgeRange from 'genre/component/AgeRange';
import Kakaopage from 'genre/component/Kakaopage';

interface IProps {
  genre: IRoute;
}
export default function GenreMobile({ genre }: IProps) {
  return (
    <>
      <TopBannerCarousel genreId={genre.id} />
      <Grid className="my-32 gap-y-48">
        <RealTimePopularityMobile genre={genre} />
        <Column className="col-1/-1 pr-0">
          <Ranking genre={genre} />
        </Column>
      </Grid>
      <Column className="my-40">
        <BottomBannerCarousel genreId={genre.id} />
      </Column>
      <Grid className="my-32 gap-y-48">
        <Column className="col-1/-1 pl-0">
          <Latest genre={genre} />
        </Column>
      </Grid>
      <Grid className="my-32 gap-y-48">
        <NewSeries genre={genre} />
        <AgeRange genre={genre} />
        <Kakaopage genre={genre} />
      </Grid>
    </>
  );
}
