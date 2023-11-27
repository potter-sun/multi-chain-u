export enum HomeMenuKey {
  Deposit = 'Deposit',
  Withdrawal = 'Withdrawal',
}

export enum ChainNameType {
  MainChain = 'MainChain AELF',
  SideChain = 'SideChain tDVV',
}

export const CHAIN_LIST = [
  {
    key: ChainNameType.MainChain,
    label: ChainNameType.MainChain,
  },
  {
    key: ChainNameType.SideChain,
    label: ChainNameType.SideChain,
  },
];
