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

export default function MobileDepositContent({
  networkList,
  depositInfo,
  qrCodeValue,
  chainChanged,
  networkChanged,
}: DepositContentProps) {
  return (
    <>
      <SelectChainWrapper
        className={styles['deposit-select-chain-wrapper']}
        mobileLabel="to"
        chainChanged={chainChanged}
      />
      <div className={clsx('flex-row-content-center', styles['QR-code-wrapper'])}>
        {qrCodeValue ? (
          <CommonQRCode value={qrCodeValue} />
        ) : (
          <div className={clsx('flex-none', styles['QR-code'])} />
        )}
      </div>
      <div className={styles['data-wrapper']}>
        <SelectNetwork networkList={networkList} selectCallback={networkChanged} />
        <div className={styles['data-divider']} />
        <div className={styles['data-address-wrapper']}>
          <CommonAddress label={DEPOSIT_ADDRESS_LABEL} value={depositInfo.depositAddress} />
        </div>
      </div>
      <div className={styles['info-wrapper']}>
        <DepositInfo />
      </div>
      <DepositDescription />
    </>
  );
}
