export enum HomeMenuKey {
  Deposit = 'Deposit',
  Withdrawal = 'Withdrawal',
}

export const MENU_ITEMS = [
  {
    icon: 'xxx',
    key: HomeMenuKey.Deposit,
    label: HomeMenuKey.Deposit,
  },
  {
    icon: 'xxx',
    key: HomeMenuKey.Withdrawal,
    label: HomeMenuKey.Withdrawal,
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
