import React from 'react';
import clsx from 'clsx';
import { useCommon } from 'store/Provider/hooks';
import SelectMenu from 'pageComponents/SelectMenu';
import SelectWallet from 'pageComponents/SelectWallet';
import styles from './styles.module.scss';
import { HomeMenuKey } from 'constants/home';

export default function MobileHeader() {
  const { activeMenuKey } = useCommon();
  return (
    <div className={clsx('flex-center', styles['header-wrapper'])}>
      <SelectMenu />
      <span className={clsx('flex-1', 'text-center', styles['header-text'])}>
        {activeMenuKey === HomeMenuKey.Deposit && 'Deposit USDT'}
        {activeMenuKey === HomeMenuKey.Withdraw && 'Withdraw USDT'}
      </span>
      <SelectWallet />
    </div>
  );
}
