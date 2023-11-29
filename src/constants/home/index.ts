export enum SideMenuKey {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
}

export const MENU_ITEMS = [
  {
    icon: 'xxx',
    key: SideMenuKey.Deposit,
    label: SideMenuKey.Deposit,
  },
  {
    icon: 'xxx',
    key: SideMenuKey.Withdraw,
    label: SideMenuKey.Withdraw,
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
