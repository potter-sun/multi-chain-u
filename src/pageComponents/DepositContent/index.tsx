import React, { useCallback, useState } from 'react';
import WebDepositContent from './WebDepositContent';
import MobileDepositContent from './MobileDepositContent';
import { useCommon, useLoading } from 'store/Provider/hooks';
import { BusinessType, DepositInfo, GetNetworkListRequest, NetworkItem } from 'types/api';
import { getDepositInfo, getNetworkList } from 'utils/api/deposit';
import { ChainNameItem } from 'constants/index';

export type DepositContentProps = {
  networkList: NetworkItem[];
  depositInfo: DepositInfo;
  qrCodeValue: string;
  chainChanged: (item: ChainNameItem) => void;
  networkChanged: (item: NetworkItem) => void;
};

export default function Content() {
  const { isMobilePX, currentSymbol, chainItem } = useCommon();
  const { setLoading } = useLoading();
  const [networkList, setNetworkList] = useState<NetworkItem[]>([]);
  const [depositInfo, setDepositInfo] = useState<DepositInfo>({
    depositAddress: '',
    minAmount: '',
  });

  const getNetworkData = useCallback(
    async ({ chainId, symbol }: Omit<GetNetworkListRequest, 'type'>) => {
      try {
        setLoading(true);
        const { networkList } = await getNetworkList({
          type: BusinessType.Deposit,
          chainId: chainId,
          symbol: symbol,
        });
        setNetworkList(networkList);
        setLoading(false);
      } catch (error) {
        // TODO
        setLoading(false);
        console.log('getNetworkList error:', error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  const handleChainChanged = useCallback(
    async (item: ChainNameItem) => {
      await getNetworkData({
        chainId: item.key,
        symbol: currentSymbol,
      });
    },
    [currentSymbol, getNetworkData],
  );

  const handleNetworkChanged = useCallback(
    async (item: NetworkItem) => {
      const res = await getDepositInfo({
        chainId: chainItem.key,
        network: item.network,
        symbol: currentSymbol,
      });
      setDepositInfo(res.depositInfo);
      // getWithdrawInfo({
      //   chainId: 'AELF',
      //   network: 'ETH',
      //   symbol: 'USDT',
      //   amount: '10',
      //   address: 'ELF_A4pVWW2tC4jinQ8MduBvQxYvDnKM7t8YFqbSc5YLtdiDerETp_AELF',
      // });
    },
    [chainItem.key, currentSymbol],
  );

  return isMobilePX ? (
    <MobileDepositContent
      networkList={networkList}
      depositInfo={depositInfo}
      qrCodeValue={depositInfo.depositAddress}
      chainChanged={handleChainChanged}
      networkChanged={handleNetworkChanged}
    />
  ) : (
    <WebDepositContent
      networkList={networkList}
      depositInfo={depositInfo}
      qrCodeValue={depositInfo.depositAddress}
      chainChanged={handleChainChanged}
      networkChanged={handleNetworkChanged}
    />
  );
}
