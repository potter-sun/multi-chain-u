import React from 'react';
import clsx from 'clsx';
import WalletDropdown from 'pageComponents/WalletDropdown';
import styles from './styles.module.scss';

export default function WebHeader() {
  return (
    <div className={clsx('flex-row-between', styles['header-container'])}>
      <div className={styles.logo} />
      <WalletDropdown />
    </div>
  );
}
