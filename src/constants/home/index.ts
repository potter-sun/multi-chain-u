import { CHAIN_NAME_ENUM } from 'constants/index';

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

export interface ChainNameItem {
  key: CHAIN_NAME_ENUM;
  label: CHAIN_NAME_ENUM;
}

export const CHAIN_LIST: ChainNameItem[] = [
  {
    key: CHAIN_NAME_ENUM.MainChain,
    label: CHAIN_NAME_ENUM.MainChain,
  },
  {
    key: CHAIN_NAME_ENUM.SideChain,
    label: CHAIN_NAME_ENUM.SideChain,
  },
];
