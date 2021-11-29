import { IAgeRating } from 'common/type';
import { HTMLProps } from 'react';

import AdultIcon from '@icons/icons-adult.svg';
import Adult15Icon from '@icons/icons-adult-15.svg';
import StageOnBadge from '@icons/badge_stage_on.svg';
import PageGoBadge from '@icons/badge_page_go.svg';
import LargeCompletedBadge from '@icons/badge_completed_lg.svg';
import SmallCompletedBadge from '@icons/badge_completed_sm.svg';
import Flex from 'common/component/Flex';

const HEIGHT_PERCENTAGE = (67 / 44) * 100;

interface IProps extends HTMLProps<HTMLElement> {
  src?: string;
  alt?: string;
  ageRating: IAgeRating;
  stageOn?: boolean;
  pageGo?: boolean;
  completedBadge?: false | 'LARGE' | 'SMALL';
  compact?: boolean;
  className?: string;
}

export default function Thumbnail({
  src = '/static/images/img-dummy-thumbnail.png',
  alt,
  ageRating,
  stageOn = false,
  pageGo = false,
  compact = false,
  completedBadge,
  className,
  ...props
}: IProps) {
  const shouldShowAgeRating =
    ageRating === 'FIFTEEN' || ageRating === 'NINETEEN';

  const shouldShowBadge = pageGo || stageOn;

  const Badge = () => {
    if (pageGo) return <PageGoBadge />;
    if (stageOn) return <StageOnBadge />;
    return null;
  };

  const CompleteBadge = () => {
    if (completedBadge === 'LARGE') return <LargeCompletedBadge />;
    if (completedBadge === 'SMALL') return <SmallCompletedBadge />;
    return null;
  };

  return (
    <Flex
      className={cn(
        'relative overflow-hidden items-start self-start flex-shrink-0',
        className,
      )}
      {...props}
    >
      <div style={{ paddingTop: `${HEIGHT_PERCENTAGE}%` }} />
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <Flex className="absolute inset-0">
        <CompleteBadge />
      </Flex>
      {shouldShowBadge && (
        <Flex
          className={`absolute bottom-0 left-0 h-auto ${
            compact ? 'desktop:h-16' : 'desktop:h-20'
          }`}
        >
          <Badge />
        </Flex>
      )}
      {shouldShowAgeRating && (
        <Flex
          className={`absolute top-4 right-4 ${
            compact ? 'w-14 h-14' : 'w-17 h-17'
          }`}
        >
          {ageRating === 'FIFTEEN' ? <Adult15Icon /> : <AdultIcon />}
        </Flex>
      )}
    </Flex>
  );
}
