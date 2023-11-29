import React from 'react';
import clsx from 'clsx';
import SelectChainWrapper from 'pageComponents/SelectChainWrapper';
import CommonAddress from 'components/CommonAddress';
import SelectNetwork from 'pageComponents/SelectNetwork';
import DepositInfo from 'pageComponents/Deposit/DepositInfo';
import DepositDescription from 'pageComponents/Deposit/DepositDescription';
import { NetworkStatus } from 'types/api';
import styles from './styles.module.scss';

export default function MobileDepositContent() {
  return (
    <>
      <SelectChainWrapper className={styles['deposit-select-chain-wrapper']} mobileLabel="to" />
      <div className={clsx('flex-row-content-center', styles['QR-code-wrapper'])}>
        <div className={clsx('flex-none', styles['QR-code'])} />
      </div>
      <div className={styles['data-wrapper']}>
        <SelectNetwork
          networkList={[
            {
              network: 'network',
              name: 'name',
              multiConfirm: 'multiConfirm',
              multiConfirmTime: 'multiConfirmTime',
              contractAddress: 'contractAddress',
              explorerUrl: 'explorerUrl',
              status: NetworkStatus.Health,
            },
          ]}
        />
        <div className={styles['data-divider']} />
        <div className={styles['data-address-wrapper']}>
          <CommonAddress />
        </div>
      </div>
      <div className={styles['info-wrapper']}>
        <DepositInfo />
      </div>
      <DepositDescription />
    </>
  );
}
