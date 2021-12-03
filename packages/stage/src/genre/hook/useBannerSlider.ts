import { useState, useRef, RefObject } from 'react';
import Slider, { Settings } from 'react-slick';

interface IUseBannerSliderParams {
  autoplaySpeed: number;
  speed: number;
  autoplay: boolean;
}

interface IUseBannerSliderReturn {
  sliderRef: RefObject<Slider>;
  slideIndex: number;
  settings: Settings;
  goToPage: (page: number) => void;
}

export default function useBannerSlider(
  options: Partial<IUseBannerSliderParams> = {},
): IUseBannerSliderReturn {
  const [slideIndex, setSlideIndex] = useState(0);

  const sliderRef = useRef<Slider>(null);

  const goToPage = (page: number) => {
    sliderRef.current?.slickGoTo(page);
  };

  const settings: Settings = {
    autoplaySpeed: options?.autoplaySpeed || 10000,
    speed: options?.speed || 500,
    autoplay: options?.autoplay === undefined ? true : options.autoplay,

    infinite: true,
    arrows: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setSlideIndex(next),
  };

  return {
    sliderRef,
    slideIndex,
    settings,
    goToPage,
  };
}
