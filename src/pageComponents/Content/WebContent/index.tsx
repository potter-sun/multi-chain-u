import React from 'react';
import clsx from 'clsx';
import ChainDropdown from 'components/ChainDropdown';
import CommonImage from 'components/CommonImage';
import Address from 'components/Address';
import DepositInfo from 'pageComponents/Deposit/DepositInfo';
import DepositDescription from 'pageComponents/Deposit/DepositDescription';
import styles from './styles.module.scss';

export default function WebContent() {
  return (
    <div className={clsx('flex-column', styles['content-wrapper'])}>
      <div className={clsx('flex-row-center', styles['chain-select-wrapper'])}>
        <span className={styles['deposit-text']}>Deposit USDT to</span>
        <ChainDropdown />
      </div>
      <div className={styles['network-select']} />
      <div className={clsx('flex-row-center', styles['deposit-address-wrapper'])}>
        {/* <CommonImage src="..." alt="QR code" /> */}
        <div className={clsx('flex-none', styles['QR-code'])} />
        <Address />
      </div>
      <div className={styles['info-wrappers']}>
        <DepositInfo />
      </div>
      <DepositDescription />
    </div>
  );
}
