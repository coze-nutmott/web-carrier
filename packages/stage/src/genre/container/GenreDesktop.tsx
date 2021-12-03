import { IRoute } from 'common/type';
import Grid from 'common/component/Grid';
import { Column } from 'common/component/Flex';
import TopBannerCarousel from 'genre/component/TopBannerCarousel';
import { RealTimePopularityDesktop } from 'genre/component/RealTimePopularity';
import Ranking from 'genre/component/Ranking';
import Latest from 'genre/component/Latest';
import BottomBannerCarousel from 'genre/component/BottomBannerCarousel';
import NewSeries from 'genre/component/NewSeries';
import AgeRange from 'genre/component/AgeRange';
import Kakaopage from 'genre/component/Kakaopage';

interface IProps {
  genre: IRoute;
}
export default function GenreDesktop({ genre }: IProps) {
  return (
    <div>
      <TopBannerCarousel genreId={genre.id} />
      <Grid className="my-40 gap-y-50">
        <RealTimePopularityDesktop genre={genre} />
        <Column className="col-1/9 pr-20">
          <Ranking genre={genre} />
        </Column>
        <Column className="col-9/-1 pl-30">
          <Latest genre={genre} />
        </Column>
      </Grid>
      <Grid className="my-40 gap-y-50">
        <Column className="col-1/-1 mt-30 mb-20">
          <BottomBannerCarousel genreId={genre.id} />
        </Column>
        <NewSeries genre={genre} />
        <AgeRange genre={genre} />
        <Kakaopage genre={genre} />
      </Grid>
    </div>
  );
}
