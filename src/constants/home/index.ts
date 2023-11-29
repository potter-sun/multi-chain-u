export enum HomeMenuKey {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
}

export const MENU_ITEMS = [
  {
    icon: 'xxx',
    key: HomeMenuKey.Deposit,
    label: HomeMenuKey.Deposit,
  },
  {
    icon: 'xxx',
    key: HomeMenuKey.Withdraw,
    label: HomeMenuKey.Withdraw,
  },
];

export enum ChainNameType {
  MainChain = 'MainChain AELF',
  SideChain = 'SideChain tDVV',
}

export interface ChainItem {
  key: ChainNameType;
  label: ChainNameType;
}

export const CHAIN_LIST: ChainItem[] = [
  {
    key: ChainNameType.MainChain,
    label: ChainNameType.MainChain,
  },
  {
    key: ChainNameType.SideChain,
    label: ChainNameType.SideChain,
  },
];
