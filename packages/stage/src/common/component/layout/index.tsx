import DefaultHeader from 'common/component/layout/defaultHeader';
import React, { ComponentType, ReactNode } from 'react';

export interface IProps {
  children: ReactNode;
  HeaderComponent?: ComponentType;
  FooterComponent?: ComponentType;
}

const DefaultLayout = ({
  children,
  HeaderComponent = DefaultHeader,
}: // FooterComponent = null,
IProps) => (
  <div className="h-full flex flex-col">
    <HeaderComponent />
    <main className="-mt-1 desktop:mt-0">{children}</main>
    {/* <FooterComponent /> */}
  </div>
);

export default DefaultLayout;
