'use client';
import React, { useEffect, Suspense } from 'react';
import { Layout as AntdLayout } from 'antd';
import Header from 'components/Header';
import Loading from 'components/Loading';
import { devices } from '@portkey/utils';
import { setIsMobile } from 'store/reducers/common/slice';
import { store } from 'store/Provider/store';

const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const resize = () => {
        const mobileType = devices.isMobile();
        const isMobileDevice =
          mobileType.apple.phone ||
          mobileType.android.phone ||
          mobileType.apple.tablet ||
          mobileType.android.tablet;
        store.dispatch(setIsMobile(isMobileDevice));
      };
      resize();
      window.addEventListener('resize', resize);
      return () => {
        window.removeEventListener('resize', resize);
      };
    }
  }, []);
  return (
    <AntdLayout className={`multi-chain-wrapper`}>
      <Header />
      <AntdLayout.Content className={`multi-chain-content`}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </AntdLayout.Content>
    </AntdLayout>
  );
};

export default Layout;
