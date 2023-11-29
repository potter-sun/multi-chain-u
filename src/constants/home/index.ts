import { CHAIN_NAME_ENUM, SupportedELFChainId } from 'constants/index';

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
