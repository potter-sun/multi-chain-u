import React from 'react';
import clsx from 'clsx';
import SelectChainWrapper from 'pageComponents/SelectChainWrapper';
import CommonImage from 'components/CommonImage';
import CommonAddress from 'components/CommonAddress';
import SelectNetwork from 'pageComponents/SelectNetwork';
import DepositInfo from 'pageComponents/Deposit/DepositInfo';
import DepositDescription from 'pageComponents/Deposit/DepositDescription';
import { NetworkStatus } from 'types/api';
import styles from './styles.module.scss';

export default function WebContent() {
  return (
    <>
      <SelectChainWrapper webLabel="Deposit USDT to" />
      <div className={styles['select-network-wrapper']}>
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
      </div>
      <div className={clsx('flex-row-center', styles['deposit-address-wrapper'])}>
        {/* <CommonImage src="..." alt="QR code" /> */}
        <div className={clsx('flex-none', styles['QR-code'])} />
        <CommonAddress />
      </div>
      <div className={styles['info-wrappers']}>
        <DepositInfo />
      </div>
      <DepositDescription />
    </>
  );
}
