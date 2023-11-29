'use client';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { initLanguage, useLanguage } from 'i18n';
import '@portkey/did-ui-react/dist/assets/index.css';
import { prefixCls } from 'constants/index';
import StoreProvider from 'store/Provider/StoreProvider';
import WebLoginProvider from './webLoginProvider';
import { ANTD_LOCAL } from 'i18n/config';

let childrenNode: any = undefined;
const bodyRootWrapper = document.body;

ConfigProvider.config({
  prefixCls,
});

initLanguage(localStorage);

export default function RootProviders({ children }: { children?: React.ReactNode }) {
  const { language } = useLanguage();

  if (childrenNode === undefined) childrenNode = children;

  useEffect(() => {
    let preLanguageWrapper: string | null = null;
    bodyRootWrapper.classList.forEach((item) => {
      if (item.includes('-language-wrapper')) {
        preLanguageWrapper = item;
      }
    });
    preLanguageWrapper && bodyRootWrapper.classList.remove(preLanguageWrapper);
    bodyRootWrapper.classList.add(`${language}-language-wrapper`);
  }, [language]);

  // TODO prefixCls={prefixCls}
  return (
    <ConfigProvider locale={ANTD_LOCAL[language]} autoInsertSpaceInButton={false}>
      <StoreProvider>
        <WebLoginProvider>{children}</WebLoginProvider>
      </StoreProvider>
    </ConfigProvider>
  );
}
