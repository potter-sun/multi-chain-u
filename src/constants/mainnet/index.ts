import * as AELF from '../platform/AELF';
import * as tDVV from '../platform/tDVV';
import { SupportedELFChainId } from 'constants/chain';
import { NetworkType } from '@portkey/provider-types';

export const NETWORK_TYPE: NetworkType = 'MAIN';

export const ACTIVE_CHAIN: any = {
  [SupportedELFChainId.AELF]: true,
  [SupportedELFChainId.tDVV]: true,
};

export type ChainConstantsType = typeof AELF | typeof tDVV;

export const AelfReact = {
  [SupportedELFChainId.AELF]: {
    chainId: AELF.CHAIN_INFO.chainId,
    rpcUrl: AELF.CHAIN_INFO.rpcUrl,
  },
  [SupportedELFChainId.tDVV]: {
    chainId: tDVV.CHAIN_INFO.chainId,
    rpcUrl: tDVV.CHAIN_INFO.rpcUrl,
  },
};
