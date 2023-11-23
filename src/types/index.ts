import type { HttpProvider } from 'web3-core';
import type { AElfDappBridge } from '@aelf-react/types';
import type { AElfContextType } from '@aelf-react/core/dist/types';
import { AElfNodes } from 'constants/aelf';
import { Accounts } from '@portkey/provider-types';
import { CHAIN_NAME } from 'constants/index';

export type ChainId = keyof typeof CHAIN_NAME;

export type ChainType = 'ELF';

export type WalletType = 'PORTKEY';

export type AelfInstancesKey = keyof typeof AElfNodes;

export type Web3Type = {
  chainId?: ChainId;
  library?: HttpProvider | any;
  aelfInstance?: AElfDappBridge;
  provider?: any;
  isActive?: boolean;
  account?: string;
  connector?: string;
  deactivate?: AElfContextType['deactivate'];
  aelfInstances?: { [key in AelfInstancesKey]: AElfDappBridge };
  isPortkey?: boolean;
  walletType?: WalletType;
  accounts?: Accounts;
};
