import React from 'react';
import WebDepositContent from './WebDepositContent';
import MobileDepositContent from './MobileDepositContent';
import { useCommon } from 'store/Provider/hooks';

export default function Content() {
  const { isMobilePX } = useCommon();
  return isMobilePX ? <MobileDepositContent /> : <WebDepositContent />;
}
