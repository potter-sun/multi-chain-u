import React from 'react';
import { useCommon } from 'store/Provider/hooks';
import MobileSelectWallet from './MobileSelectWallet';
import WebSelectWallet from './WebSelectWallet';

export default function SelectWallet() {
  const { isMobilePX } = useCommon();
  return isMobilePX ? <MobileSelectWallet /> : <WebSelectWallet />;
}
