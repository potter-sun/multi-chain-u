import { SideMenuKey } from './home';

export enum WalletType {
  unknown = 'unknown',
  discover = 'discover',
  portkey = 'portkey',
}

export enum NetworkType {
  MAIN = 'MAIN',
  TESTNET = 'TESTNET',
}

export const ChainNamePrefix = {
  MainChain: 'MainChain',
  SideChain: 'SideChain',
};

export const SECONDS_60 = 60000;

export const prefixCls = 'multi-chain-u';
export const AppName = 'Multi Chain U';

export * from './testnet';

export type EntryConfig = {
  type: SideMenuKey; // 'Deposit' | 'Withdrawal'
  aelfNetwork: NetworkType; // 'MAIN' | 'TESTNET'
  tokenSymbol: string; // only 'USDT'
  depositFromNetwork: string; // eg: "ETH"
  withDrawalAddress: string;
  withDrawalNetwork: string; // eg: "ETH"
  withDrawalAmount: string; // not decimal
};
