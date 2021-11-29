import GenreLink from 'common/component/layout/genreLink';
import HeaderBase from 'common/component/layout/headerBase';
import { Anchor, Text, TextButton } from 'common/component/shared';
import { ROUTES_MAP } from 'common/constant';
import useMedia from 'common/hook/useMedia';
import { IRoute } from 'common/type';
import { Page } from 'common/util/kRouter';
import { useRouter } from 'next/router';
import React, { ReactNode, useMemo } from 'react';
import KakaoPageIcon from '@icons/icons-brand-kakaopage-black-white.svg';
import HeartIcon from '@icons/icons-favorite-genre.svg';
import LibraryIcon from '@icons/icons-library.svg';
import SearchIcon from '@icons/icons-search.svg';

// NOTE: 19세 작품 필터 비활성화
// import { AdultFilterToggle } from '@/components/Toggle';
// import useAdultFilter from '@/hooks/useAdultFilter';

/**
 * TODO
 * session
 * redux
 * 선호 장르 선택 팝업
 * 선호도 반영
 * 랭킹 메뉴
 */

interface IProps {
  children?: ReactNode;
}

const DefaultHeader = ({ children }: IProps) => {
  const router = useRouter();
  const isDesktop = useMedia('desktop');

  const currentGenre = useMemo<string>(() => {
    return String(router.query.genre) || '';
  }, [router]);

  return (
    <HeaderBase bottom={children}>
      <div className="flex flex-1-0-full desktop:flex-1-0-auto order-1 desktop:order-none">
        <div className="grid desktop:flex flex-wrap grid-flow-col items-center py-12 px-20 desktop:p-0 mx-0 desktop:mx-32 w-full max-w-full-view overflow-x-scroll desktop:overflow-x-visible overflow-y-hidden desktop:overflow-y-visible auto-cols-max">
          {ROUTES_MAP.map(route => (
            <GenreLink
              key={route.id}
              route={route}
              isActive={currentGenre === route.url}
            />
          ))}
          <GenreLink
            route={RANKING_ROUTE}
            isActive={currentGenre === 'ranking'}
          />
          <div className="flex">
            <TextButton
              variant="btn_transparent_grey01"
              textVariant="s10_regular_grey02"
            >
              <div className="flex items-center">
                <div className="w-24 desktop:w-16 h-24 desktop:h-16 mr-4">
                  <HeartIcon />
                </div>
                <Text
                  variant="s16_medium_grey02"
                  className="hidden desktop:block"
                >
                  선호설정
                </Text>
              </div>
            </TextButton>
          </div>
        </div>
      </div>
      <div className="flex items-center ml-auto mr-16 desktop:mr-0">
        {isDesktop && (
          <Anchor
            className="mr-20 w-20 h-20 text-grey02"
            pageInfo={{ page: Page.Library }}
          >
            <LibraryIcon />
          </Anchor>
        )}

        <Anchor
          display="flex"
          className="w-20 h-20 mr-16 desktop:mr-20 text-grey02"
          pageInfo={{ page: Page.Search }}
        >
          <SearchIcon />
        </Anchor>
        {/* {session.user ? <UsersMenu /> : <LoginMenu />} */}
        <Anchor
          className="flex ml-16 desktop:20 p-6 desktop:p-8 items-center rounded-md desktop:rounded-sm bg-yellow"
          pageInfo="https://link-page.kakao.com/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex w-18 h-18">
            <KakaoPageIcon />
          </div>
        </Anchor>
      </div>
    </HeaderBase>
  );
};

const RANKING_ROUTE: Omit<IRoute, 'id'> = {
  text: '랭킹',
  url: 'ranking',
};

export default DefaultHeader;
