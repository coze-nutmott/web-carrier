/**
 * 헤더의 기본 형태
 *
 * ```
 * +------+------------------+
 * | Logo | children         |
 * +======+==================+
 * |     bottom(optional)    |
 * +-------------------------+
 * ```
 */

import React, { ReactNode } from 'react';
import { Anchor, Text } from 'common/component/shared';
import { Page } from 'common/util/kRouter';

import styles from './headerBase.module.scss';
import A11y from 'common/component/A11y';
import Wrapper from 'common/component/Wrapper';

interface IProps {
  bottom?: React.ReactNode;
  children: ReactNode;
}

const HeaderBase = ({ bottom, children }: IProps) => {
  return (
    <header className="border-b border-divideLine relative">
      <Wrapper
        variants="desktopOnly"
        className={cn(
          'flex-wrap desktop:flex-nowrap text-black px-0 desktop:px-24 py-0 desktop:py-18 items-center my-0',
          styles.headerContainer,
        )}
      >
        <A11y as="h1">카카오페이지 스테이지</A11y>

        <div
          className={cn(
            'flex m-16 mb-8 desktop:m-0 desktop:ml-4 relative',
            styles.logoLink,
          )}
        >
          <Anchor pageInfo={{ page: Page.Main }}>
            {/* TODO: darkmode */}
            <img
              className={cn('h-25 desktop:h-auto min-h', styles.logoImage)}
              src={'/static/logo/logo.png'}
              srcSet={
                '/static/logo/logo@2x.png 2x, /static/logo/logo@3x.png 3x'
              }
              alt="kakaostage logo"
            />
            <Text
              className="absolute -left-1 -top-12"
              variant="s10_normal_grey"
            >
              BETA
            </Text>
          </Anchor>
        </div>
        {children}
      </Wrapper>
      {bottom}
    </header>
  );
};

export default HeaderBase;
