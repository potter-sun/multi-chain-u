import { SupportedELFChainId } from 'constants/index';
import { getAElf, getNodeByChainId } from './aelfUtils';
import { aelf } from '@portkey/utils';

export interface IAelfInstance {
  instance?: AelfInstanceType;
  aelfSDK?: any;
}

export type AelfInstanceType = { getAelfInstance: (rpcUrl: string, timeout?: number) => any };

export type AelfInstanceOptions = {
  chainId: SupportedELFChainId;
};

class AelfInstance implements IAelfInstance {
  public instance?: AelfInstanceType;
  public aelfSDK?: any;

  constructor(options: AelfInstanceOptions) {
    this.init(options.chainId);
  }

  init(chainId: SupportedELFChainId) {
    const rpcUrl = getNodeByChainId(chainId).rpcUrl;
    this.instance = aelf.getAelfInstance(rpcUrl);
    this.aelfSDK = getAElf(chainId);
  }
}
const aelfInstance = new AelfInstance({ chainId: SupportedELFChainId.AELF });

export default aelfInstance;
