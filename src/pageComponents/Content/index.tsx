import React from 'react';
import WebContent from './WebContent';
import MobileContent from './MobileContent';
import { useCommon } from 'store/Provider/hooks';

export default function Content() {
  const { isMobile } = useCommon();
  return isMobile ? <MobileContent /> : <WebContent />;
}
