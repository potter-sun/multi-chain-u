import React from 'react';
import clsx from 'clsx';
import SelectWallet from 'pageComponents/SelectWallet';
import styles from './styles.module.scss';

export default function WebHeader() {
  return (
    <div className={clsx('flex-row-between', styles['header-container'])}>
      <div className={styles.logo} />
      <SelectWallet />
    </div>
  );
}
