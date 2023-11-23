'use client';
import React, { useEffect, Suspense } from 'react';
import { Layout as AntdLayout } from 'antd';
import Header from 'components/Header';
import Loading from 'components/Loading';
import dynamic from 'next/dynamic';
import isMobile from 'utils/isMobile';
import { setIsMobile } from 'store/reducers/common/slice';
import { store } from 'store/Provider/store';

const Layout = dynamic(async () => {
  // const { WebLoginState, useWebLogin, useCallContract, WebLoginEvents, useWebLoginEvent } =
  //   await import('aelf-web-login').then((module) => module);

  return (props: React.PropsWithChildren<{}>) => {
    const { children } = props;

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const resize = () => {
          const ua = navigator.userAgent;
          const mobileType = isMobile(ua);
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
        <AntdLayout.Content className={`multi-chain-content min-h-[100vh] flex justify-center`}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </AntdLayout.Content>
      </AntdLayout>
    );
  };
});

export default Layout;
