import Link from 'next/link';
import GenreLink from 'common/component/layout/GenreLink';
import HeaderBase from 'common/component/layout/HeaderBase';

import { Anchor } from 'common/component/shared';
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
import useSession from 'common/hook/useSession';
import UserMenu from 'common/component/layout/UserMenu';
import Flex from 'common/component/Flex';
import HorizontalScroll from 'common/component/HorizontalScroll';

// NOTE: 19세 작품 필터 비활성화
// import { AdultFilterToggle } from '@/components/Toggle';
// import useAdultFilter from '@/hooks/useAdultFilter';

/**
 * TODO
 * redux
 * 선호 장르 선택 팝업
 * 선호도 반영
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

  const { login, session } = useSession();

  return (
    <HeaderBase bottom={children}>
      <Flex className="flex-1-0-full desktop:flex-1-0-auto order-1 desktop:order-none">
        <HorizontalScroll className="items-center py-12 px-20 desktop:p-0 mx-0 desktop:mx-32 w-full">
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
          <Flex>
            <button className="desktop:border-[#E7E7E9] font-medium border-none desktop:border-1 desktop:border-solid rounded-24 p-0 desktop:py-4 desktop:px-8 mr-20">
              <div className="flex items-center">
                <div className="w-24 desktop:w-16 h-24 desktop:h-16 mr-4">
                  <HeartIcon />
                </div>
                <div className="hidden desktop:block text-12 text-gray30">
                  선호설정
                </div>
              </div>
            </button>
          </Flex>
        </HorizontalScroll>
      </Flex>
      <div className="flex items-center ml-auto mr-16 desktop:mr-0">
        {isDesktop && session.user && (
          <Link href="/library/bookmarks" passHref>
            <a className="mr-20 w-20 h-20 text-grey02">
              <LibraryIcon />
            </a>
          </Link>
        )}

        <Link href="/search" passHref>
          <Flex as="a" className="w-20 h-20 mr-16 desktop:mr-20 text-grayFont">
            <SearchIcon />
          </Flex>
        </Link>
        {session.user ? (
          <UserMenu />
        ) : (
          <Flex className="ml-auto items-center">
            <button
              className="cursor-pointer desktop:px-13 desktop:py-7 desktop:border-1 desktop:border-solid rounded-50 bg-transparent desktop:bg-black text-15 desktop:text-14 font-medium flex-shrink-0"
              onClick={() => login()}
            >
              <Flex className="items-center text-black desktop:text-white">
                로그인
              </Flex>
            </button>
          </Flex>
        )}
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
