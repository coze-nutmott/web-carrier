import Slider from 'react-slick';
import Link from 'next/link';

import useMedia from 'common/hook/useMedia';
import useBanners from 'genre/hook/useBanners';
import useBannerSlider from 'genre/hook/useBannerSlider';
import Flex from 'common/component/Flex';
import Wrapper from 'common/component/Wrapper';

interface IProps {
  genreId: number;
}
export default function TopBannerCarousel({ genreId }: IProps) {
  const { sliderRef, slideIndex, settings } = useBannerSlider();
  const { banners, isEmpty } = useBanners({
    genreId,
    placement: 'GENRE_HOME_TOP',
  });
  const imageType = useMedia('desktop') ? 'DESKTOP' : 'MOBILE';

  if (isEmpty) {
    return <div className="min-h-[62px] bg-[#F6F6F6]" />;
  }

  return (
    <div className="relative mx-auto">
      <Slider ref={sliderRef} {...settings}>
        {banners?.map(banner => (
          <Link href={banner.link} key={banner.id} passHref>
            <Flex
              as="a"
              className="relative overflow-hidden h-full items-start"
              target={banner.newTab ? '_blank' : '_self'}
              data-tiara-action-name="홈상단배너_클릭"
              data-tiara-id={banner.id}
              data-tiara-type="banner"
              data-tiara-name={banner.title}
              style={
                banner.backgroundColor
                  ? {
                      backgroundColor: banner.backgroundColor,
                    }
                  : {}
              }
            >
              <img
                className="mx-auto object-contain"
                src={
                  imageType === 'DESKTOP'
                    ? banner.desktopImage.url
                    : banner.mobileImage.url
                }
                alt="banner"
              />
              <div
                className="absolute z-[-1] top-[-40] right-[-40] bottom-[-40] left-[-40] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${banner.desktopImage.url})`,
                  filter: 'blur(20px)',
                }}
              />
            </Flex>
          </Link>
        ))}
      </Slider>
      <Wrapper className="absolute right-0 top-6 desktop:top-8 left-0 mx-auto items-center content-end px-0 desktop:px-24">
        <Flex className="absolute">
          {banners?.map((banner, index) => (
            <div
              key={banner.id}
              className="w-4 h-4 rounded-1/2 mr-6"
              style={{
                backgroundColor:
                  slideIndex === index
                    ? 'rgba(0, 0, 0, .8)'
                    : 'rgba(0, 0, 0, .3)',
              }}
            />
          ))}
        </Flex>
      </Wrapper>
    </div>
  );
}
