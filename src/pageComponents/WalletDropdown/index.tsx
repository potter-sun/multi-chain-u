import React from 'react';
import clsx from 'clsx';
import { useCommon } from 'store/Provider/hooks';
import CommonDropdown from 'components/CommonDropdown';
import SmallWallet from 'assets/images/smallWallet.svg';
import Wallet from 'assets/images/wallet.svg';
import styles from './styles.module.scss';

export default function WalletDropdown() {
  const { isMobilePX } = useCommon();
  return isMobilePX ? (
    <div className={clsx('flex-none', 'flex-center', styles['mobile-wallet-container'])}>
      <SmallWallet className={'flex-none'} />
    </div>
  ) : (
    <CommonDropdown menu={{ items: [] }}>
      <Wallet className={clsx('flex-none', styles['web-wallet-icon'])} />
      <span className={styles['web-wallet-text']}>Portkey Wallet</span>
    </CommonDropdown>
  );
}
