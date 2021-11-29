import CoverZoomModal from 'common/component/Modals/CoverZoomModal';
import Flex from 'common/component/Flex';
import { useState } from 'react';
import TestItem from 'shared/uiTest/component/TestItem';
import Thumbnail from 'common/component/Thumbnail';

const THUMBNAIL_URL =
  'https://dn-api1-kage.kakao.com/dn/ARMNz/btrlY4HMbJH/3kDy6JMXWFY0UYmtQdkET1/original.jpeg';

export function TestModals() {
  const [showCover, setShowCover] = useState(false);

  const handleThumbnailClick = () => {
    setShowCover(true);
  };

  return (
    <TestItem title="Modals">
      {showCover && (
        <CoverZoomModal
          onClose={() => setShowCover(false)}
          thumbnailUrl={THUMBNAIL_URL}
        />
      )}
      <Flex>
        <Thumbnail
          className="w-104 mr-16 cursor-zoom-in"
          ageRating="FIFTEEN"
          completedBadge="SMALL"
          stageOn={true}
          pageGo={true}
          src={THUMBNAIL_URL}
          onClick={handleThumbnailClick}
        />
      </Flex>
    </TestItem>
  );
}
