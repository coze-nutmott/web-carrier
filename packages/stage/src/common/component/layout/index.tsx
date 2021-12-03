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
    <div className={`h-full flex flex-col ${theme}-theme`}>
      <HeaderComponent />
      <main className="-mt-1 desktop:mt-0">{children}</main>
      {/* <FooterComponent /> */}
    </div>
  );
};

export default DefaultLayout;
