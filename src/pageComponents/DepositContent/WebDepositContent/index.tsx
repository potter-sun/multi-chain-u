import React from 'react';
import clsx from 'clsx';
import SelectChainWrapper from 'pageComponents/SelectChainWrapper';
import CommonAddress from 'components/CommonAddress';
import SelectNetwork from 'pageComponents/SelectNetwork';
import DepositInfo from 'pageComponents/Deposit/DepositInfo';
import DepositDescription from 'pageComponents/Deposit/DepositDescription';
import styles from './styles.module.scss';
import { DepositContentProps } from '..';
import CommonQRCode from 'components/CommonQRCode';
import { DEPOSIT_ADDRESS_LABEL } from 'constants/deposit';

export default function WebContent({
  networkList,
  depositInfo,
  qrCodeValue,
  chainChanged,
  networkChanged,
}: DepositContentProps) {
  return (
    <>
      <SelectChainWrapper webLabel="Deposit USDT to" chainChanged={chainChanged} />
      <div className={styles['select-network-wrapper']}>
        <SelectNetwork networkList={networkList} selectCallback={networkChanged} />
      </div>
      <div className={clsx('flex-row-center', styles['deposit-address-wrapper'])}>
        {qrCodeValue ? (
          <CommonQRCode value={qrCodeValue} />
        ) : (
          <div className={clsx('flex-none', styles['QR-code'])} />
        )}
        <CommonAddress label={DEPOSIT_ADDRESS_LABEL} value={depositInfo.depositAddress} />
      </div>
      <div className={styles['info-wrappers']}>
        <DepositInfo />
      </div>
      <DepositDescription />
    </>
  );
}
