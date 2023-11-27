import React, { useEffect } from 'react';
import WebChainDropdown from './WebChainDropdown';
import MobileChainDropdown from './MobileChainDropdown';
import { ChainNameType, CHAIN_LIST } from 'constants/home';
import { useCommon } from 'store/Provider/hooks';
import { setChainId } from 'store/reducers/common/slice';
import { store } from 'store/Provider/store';
import { CommonChainDropdownProps } from './types';

export default function ChainDropdown() {
  const { isMobilePX, chainId } = useCommon();
  useEffect(() => {
    if (!chainId) {
      store.dispatch(setChainId(ChainNameType.MainChain));
    }
  }, [chainId]);
  const dropdownProps: CommonChainDropdownProps = {
    chainId,
    menuItems: CHAIN_LIST,
    selectedKeys: [chainId],
    onClick: ({ key }) => {
      store.dispatch(setChainId(key as ChainNameType));
    },
  };
  return isMobilePX ? (
    <MobileChainDropdown {...dropdownProps} />
  ) : (
    <WebChainDropdown {...dropdownProps} />
  );
}
