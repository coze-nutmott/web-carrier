import React, { ReactNode, useState } from 'react';
import Link from 'next/link';

import Drawer from 'common/component/Drawer';
import Dropdown from 'common/component/Dropdown';
import Flex from 'common/component/Flex';
import ProfileImage from 'common/component/ProfileImage';
import useMedia from 'common/hook/useMedia';
import useSession from 'common/hook/useSession';
import Number from 'common/component/Number';
import { accountInfoPath } from 'common/util/route';
import useUnreadTalks from 'common/hook/useUnreadTalks';

// TODO: user menu
export default function UserMenu() {
  const { session, signOut } = useSession();
  const [isOpened, setIsOpened] = useState(false);
  const isDesktop = useMedia('desktop');
  const { newMessageCount, haveNewMessage } = useUnreadTalks();
  const messageCountLabel = newMessageCount > 9 ? '9+' : `${newMessageCount}`;

  return (
    <Flex className="relative">
      <button type="button" onClick={() => setIsOpened(prev => !prev)}>
        <ProfileImage
          className="w-36 h-36 cursor-pointer"
          profile={session?.user?.profile}
        />
        {haveNewMessage && (
          <div className="absolute top-0 right-0">
            <NewMessageIcon />
          </div>
        )}
      </button>
      {isOpened && (
        <Container onClose={() => setIsOpened(false)} isDesktop={isDesktop}>
          <Link href="/workshop" passHref>
            <a className="w-full text-left" onClick={() => setIsOpened(false)}>
              창작공간
            </a>
          </Link>
          {!isDesktop && (
            <Link href="/library/bookmarks" passHref>
              <a
                className="w-full text-left"
                onClick={() => setIsOpened(false)}
              >
                내 서재
              </a>
            </Link>
          )}
          <Link href="/talks" passHref>
            <Flex
              as="a"
              className="w-full text-left"
              onClick={() => setIsOpened(false)}
            >
              메시지
              {haveNewMessage && (
                <Flex className="text-black bg-main rounded-11 items-center px-8 py-2 desktop:py-0 desktop:px-8 text-12 ml-2">
                  <Number>{messageCountLabel}</Number>
                </Flex>
              )}
            </Flex>
          </Link>
          <Link href="/nickname" passHref>
            <a className="w-full text-left" onClick={() => setIsOpened(false)}>
              닉네임
            </a>
          </Link>
          <Link href={accountInfoPath()} passHref>
            <a
              className="w-full text-left"
              target="_blank"
              onClick={() => setIsOpened(false)}
            >
              페이지 계정
            </a>
          </Link>
          <Link href="/help/faqs" passHref>
            <a className="w-full text-left" onClick={() => setIsOpened(false)}>
              도움말
            </a>
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="absolute desktop:static text-center desktop:text-left right-0 bottom-24 left-0 w-full text-12 desktop:text-15 font-medium desktop:font-normal cursor-pointer text-grayFont desktop:text-mainText"
          >
            로그아웃
          </button>
        </Container>
      )}
    </Flex>
  );
}

function NewMessageIcon() {
  return (
    <div className="w-9 h-9 border-2 border-solid border-white bg-[#FF7373] rounded-1/2" />
  );
}

interface IContainerProps {
  onClose: () => void;
  isDesktop: boolean;
  children?: ReactNode;
}

function Container({ children, onClose, isDesktop }: IContainerProps) {
  return isDesktop ? (
    <Dropdown
      className="absolute top-full right-0 w-154 mt-10 z-1"
      onClose={onClose}
    >
      {children}
    </Dropdown>
  ) : (
    <Drawer onClose={onClose}>{children}</Drawer>
  );
}
