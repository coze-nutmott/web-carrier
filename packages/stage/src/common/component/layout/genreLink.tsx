import React from 'react';
import { IRoute } from 'common/type';
import { Anchor, Text } from 'common/component/shared';
import { kRouter, Page } from 'common/util/kRouter';

interface IProps {
  route: Omit<IRoute, 'id'>;
  isActive?: boolean;
}

const GenreLink = ({ route, isActive }: IProps) => {
  const handleClick = () => {
    kRouter.routeTo(
      {
        page: Page.Genre,
        genre: route.url,
      },
      {
        isReplace: false,
      },
    );
  };

  return (
    <Anchor className="relative mr-34 desktop:mr-28" onClick={handleClick}>
      {isActive ? (
        <>
          <Text variant="s16_bold_black">{route.text}</Text>
          <div className="w-8 desktop:w-10 h-8 desktop:h-10 absolute bg-yellow top-0 -right-1 desktop:-right-4 z-[-1]" />
        </>
      ) : (
        <Text variant="s16_medium_grey02">{route.text}</Text>
      )}
    </Anchor>
  );
};

export default GenreLink;
