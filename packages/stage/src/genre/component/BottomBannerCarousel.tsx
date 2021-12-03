import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useBannerSlider from 'genre/hook/useBannerSlider';
import useMedia from 'common/hook/useMedia';
import useBanners from 'genre/hook/useBanners';
import Flex, { Column } from 'common/component/Flex';
import Wrapper from 'common/component/Wrapper';

interface IProps {
  genreId: number;
}

export default function BottomBannerCarousel({ genreId }: IProps) {
  const { sliderRef, slideIndex, settings } = useBannerSlider();
  const imageType = useMedia('desktop') ? 'DESKTOP' : 'MOBILE';
  const { banners } = useBanners({ genreId, placement: 'GENRE_HOME_BOTTOM' });

  if (!banners) return null;

  return (
    <Column>
      <div className="relative mx-auto w-full">
        <Slider ref={sliderRef} {...settings}>
          {banners?.map(banner => (
            <Link href={banner.link} key={banner.id} passHref>
              <Flex
                as="a"
                className="items-start"
                target={banner.newTab ? '_blank' : '_self'}
                data-tiara-action-name="홈하단배너_클릭"
                data-tiara-id={banner.id}
                data-tiara-type="banner"
                data-tiara-name={banner.title}
              >
                <img
                  alt="banner"
                  className="w-full object-cover"
                  src={
                    imageType === 'DESKTOP'
                      ? banner.desktopImage.url
                      : banner.mobileImage.url
                  }
                />
              </Flex>
            </Link>
          ))}
        </Slider>
        <Wrapper className="absolute right-0 left-0 mx-auto justify-center bottom-6 desktop:bottom-8">
          {banners?.map((banner, index) => (
            <div
              key={banner.id}
              className={cn(
                slideIndex === index ? 'w-18' : 'w-6',
                'h-6 rounded-6 mr-6',
              )}
              style={{
                backgroundColor:
                  slideIndex === index
                    ? 'rgba(0, 0, 0, .8)'
                    : 'rgba(0, 0, 0, .3)',
              }}
            />
          ))}
        </Wrapper>
      </div>
    </Column>
  );
}
