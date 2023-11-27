import React from 'react';
import clsx from 'clsx';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import WalletDropdown from 'pageComponents/WalletDropdown';
import styles from './styles.module.scss';

export default function MobileHeader() {
  return (
    <div className={clsx('flex-center', styles['header-wrapper'])}>
      <div className={clsx('flex-none', 'flex-row-center', styles['header-icon-wrapper'])}>
        <MenuOutlined className={styles['header-icon']} rev />
      </div>
      <span className={clsx('flex-1', 'text-center', styles['header-text'])}>Deposit USDT</span>
      <WalletDropdown />
    </div>
  );
}
