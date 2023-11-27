import React from 'react';
import clsx from 'clsx';
import SelectMenu from 'pageComponents/SelectMenu';
import WalletDropdown from 'pageComponents/WalletDropdown';
import styles from './styles.module.scss';

export default function MobileHeader() {
  return (
    <div className={clsx('flex-center', styles['header-wrapper'])}>
      <SelectMenu />
      <span className={clsx('flex-1', 'text-center', styles['header-text'])}>Deposit USDT</span>
      <WalletDropdown />
    </div>
  );
}
