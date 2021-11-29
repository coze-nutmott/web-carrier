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

interface IProps {
  bottom?: React.ReactNode;
  children: ReactNode;
}

const HeaderBase = ({ bottom, children }: IProps) => {
  return (
    <header className="border-b border-grey01 relative">
      <div
        className={cn(
          'flex flex-wrap desktop:flex-nowrap px-0 desktop:px-24 py-0 desktop:py-18 items-center text-black mx-auto',
          styles.headerContainer,
        )}
      >
        <h1 className="h-1 w-1 hidden">카카오페이지 스테이지</h1>

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
              variant="s10_normal_grey02"
            >
              BETA
            </Text>
          </Anchor>
        </div>
        {children}
      </div>
      {bottom}
    </header>
  );
};

export default HeaderBase;
