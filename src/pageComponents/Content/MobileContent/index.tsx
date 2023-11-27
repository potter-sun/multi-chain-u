import React from 'react';
import clsx from 'clsx';
import ChainDropdown from 'components/ChainDropdown';
import Address from 'components/Address';
import DepositInfo from 'pageComponents/Deposit/DepositInfo';
import DepositDescription from 'pageComponents/Deposit/DepositDescription';
import styles from './styles.module.scss';

export default function MobileContent() {
  return (
    <div className={styles['content-wrapper']}>
      <div className={clsx('flex-center', styles['chain-wrapper'])}>
        <span className={styles['chain-text']}>to</span>
        <ChainDropdown />
      </div>
      <div className={clsx('flex-row-content-center', styles['QR-code-wrapper'])}>
        <div className={clsx('flex-none', styles['QR-code'])} />
      </div>
      <div className={styles['address-wrapper']}>
        <Address />
      </div>
      <div className={styles['info-wrapper']}>
        <DepositInfo />
      </div>
      <DepositDescription />
    </div>
  );
}
