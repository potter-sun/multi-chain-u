'use client';
import React, { useEffect, Suspense } from 'react';
import { Layout as AntdLayout } from 'antd';
import Header from 'components/Header';
import Sider from 'components/Sider';
import Loading from 'components/Loading';
import { devices } from '@portkey/utils';
import { setIsMobile } from 'store/reducers/common/slice';
import { store } from 'store/Provider/store';
import { useCommon } from 'store/Provider/hooks';
import clsx from 'clsx';
import styles from './styles.module.scss';

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
  const { isMobile } = useCommon();
  return (
    <AntdLayout
      className={clsx(
        'multi-chain-wrapper',
        styles['layout-wrapper'],
        styles['layout-wrapper-weight'],
      )}>
      <Header />
      <AntdLayout className={styles['layout-content-wrapper']}>
        {!isMobile && <Sider />}
        <AntdLayout.Content className={`multi-chain-content`}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
