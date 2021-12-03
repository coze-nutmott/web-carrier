import { Column } from 'common/component/Flex';
import DefaultHeader from 'common/component/layout/DefaultHeader';
import React, { ComponentType, ReactNode } from 'react';
import { useSelector } from 'react-redux';

export interface IProps {
  children: ReactNode;
  HeaderComponent?: ComponentType;
  FooterComponent?: ComponentType;
}

const DefaultLayout = ({
  children,
  HeaderComponent = DefaultHeader,
}: // FooterComponent = null,
IProps) => {
  const theme = useSelector(state => state.common.theme);

  return (
    <Column className={`h-full ${theme}-theme`}>
      <HeaderComponent />
      <main className="flex-grow -mt-1 desktop:mt-0">{children}</main>
      {/* <FooterComponent /> */}
    </Column>
  );
};

export default DefaultLayout;
