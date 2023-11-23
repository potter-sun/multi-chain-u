import { SupportedELFChainId } from 'constants/chain';
import * as AELF_Test from '../platform/AELF_Test';
import * as tDVV_Test from '../platform/tDVV_Test';
import * as tDVW_Test from '../platform/tDVW_Test';

export const ACTIVE_CHAIN: any = {
  [SupportedELFChainId.AELF]: true,
  [SupportedELFChainId.tDVV]: true,
};

export const AelfReact = {
  [SupportedELFChainId.AELF]: {
    chainId: AELF_Test.CHAIN_INFO.chainId,
    rpcUrl: AELF_Test.CHAIN_INFO.rpcUrl,
  },
  [SupportedELFChainId.tDVV]: {
    chainId: tDVV_Test.CHAIN_INFO.chainId,
    rpcUrl: tDVV_Test.CHAIN_INFO.rpcUrl,
  },
  [SupportedELFChainId.tDVW]: {
    chainId: tDVW_Test.CHAIN_INFO.chainId,
    rpcUrl: tDVW_Test.CHAIN_INFO.rpcUrl,
  },
};
