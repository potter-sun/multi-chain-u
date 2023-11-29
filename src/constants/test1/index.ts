import * as AELF_Test from './AELF';
import * as tDVV_Test from './tDVV';
import { NetworkType } from '@portkey/provider-types';

export enum SupportedELFChainId {
  AELF = 'AELF',
  tDVV = 'tDVV',
}

export const NETWORK_TYPE: NetworkType = 'TESTNET';

export const ACTIVE_CHAIN: any = {
  [SupportedELFChainId.AELF]: true,
  [SupportedELFChainId.tDVV]: true,
};

export type ChainConstantsType = typeof AELF_Test | typeof tDVV_Test;

export const SupportedELFChain: { [k: string | number]: ChainConstantsType } = {
  [SupportedELFChainId.AELF]: AELF_Test,
  [SupportedELFChainId.tDVV]: tDVV_Test,
};

export const AELF_NODES = {
  AELF: AELF_Test.CHAIN_INFO,
  tDVV: tDVV_Test.CHAIN_INFO,
};

export const CHAIN_NAME: { [chainId in SupportedELFChainId]: string } = {
  [SupportedELFChainId.AELF]: 'MainChain AELF Testnet',
  [SupportedELFChainId.tDVV]: 'SideChain tDVV Testnet',
};

export enum CHAIN_NAME_ENUM {
  'MainChain' = 'MainChain AELF',
  'SideChain' = 'SideChain tDVV',
}

export const AelfReact = {
  [SupportedELFChainId.AELF]: {
    chainId: AELF_Test.CHAIN_INFO.chainId,
    rpcUrl: AELF_Test.CHAIN_INFO.rpcUrl,
  },
  [SupportedELFChainId.tDVV]: {
    chainId: tDVV_Test.CHAIN_INFO.chainId,
    rpcUrl: tDVV_Test.CHAIN_INFO.rpcUrl,
  },
};
