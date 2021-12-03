import A11y from 'common/component/A11y';
import ActiveLink from 'common/component/ActiveLink';
import Flex from 'common/component/Flex';
import HorizontalScroll from 'common/component/HorizontalScroll';
import DefaultHeader from 'common/component/layout/DefaultHeader';
import Wrapper from 'common/component/Wrapper';
import { ROUTES_MAP } from 'common/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GenreHeader() {
  const router = useRouter();

  const currentGenreUrl = router.query.genre;
  const currentGenre = ROUTES_MAP.find(route => route.url === currentGenreUrl);
  const subroutes = currentGenre?.subRoutes;

  const links = [
    { url: '', text: '홈' },
    ...(subroutes || []),
    // NOTE Remove Keyword
    // { url: 'keywords', text: '키워드' },
  ];

  return (
    <DefaultHeader>
      <div className="border-t-1 border-solid border-divideLine">
        <Wrapper
          as="nav"
          className="relative items-start desktop:items-center"
          variant="desktopOnly"
        >
          <A11y as="h2">{currentGenre?.text} 장르 내비게이션</A11y>
          <HorizontalScroll
            className="flex-1-0-full desktop:flex-grow"
            space="16px"
            style={{
              gridTemplateColumns: 'auto minmax(max-content, 1fr) auto',
            }}
          >
            <Flex className="justify-start h-44 desktop:h-60">
              {links.map(({ url, text }) => (
                <Flex className="mx-4 desktop:mx-8" key={url}>
                  <Link href={`/${currentGenreUrl}/${url}`} passHref>
                    <ActiveLink
                      className="flex items-center justify-center grid-cols-1 mx-auto p-12 desktop:pt-16 desktop:px-12 desktop:pb-14
                    text-grayFont desktop:text-black text-14 desktop:text-15 border-b-1 border-solid border-white"
                      activeClassName="mb-0 desktop:-mb-1 pb-10 border-b-2 border-black text-black font-bold"
                    >
                      {text}
                    </ActiveLink>
                  </Link>
                </Flex>
              ))}
            </Flex>
          </HorizontalScroll>
        </Wrapper>
      </div>
    </DefaultHeader>
  );
}
