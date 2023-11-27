import React, { useEffect } from 'react';
import WebSelectChain from './WebSelectChain';
import MobileSelectChain from './MobileSelectChain';
import { CHAIN_LIST } from 'constants/home';
import { useCommon } from 'store/Provider/hooks';
import { setChainItem } from 'store/reducers/common/slice';
import { store } from 'store/Provider/store';
import { CommonSelectChainProps } from './types';

export default function SelectChain() {
  const { isMobilePX, chainItem } = useCommon();
  useEffect(() => {
    if (!chainItem) {
      store.dispatch(setChainItem(CHAIN_LIST[0]));
    }
  }, [chainItem]);
  const dropdownProps: CommonSelectChainProps = {
    menuItems: CHAIN_LIST,
    selectedItem: chainItem,
    onClick: (item) => {
      store.dispatch(setChainItem(item));
    },
  };
  return isMobilePX ? (
    <MobileSelectChain {...dropdownProps} />
  ) : (
    <WebSelectChain {...dropdownProps} />
  );
}
