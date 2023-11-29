import React, { useState } from 'react';
import clsx from 'clsx';
import SmallWallet from 'assets/images/smallWallet.svg';
import CommonDrawer from 'components/CommonDrawer';
import Address from '../Address';
import styles from './styles.module.scss';

export default function SelectWallet() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className={clsx('flex-none', 'flex-center', styles['wallet-container'])}
        onClick={() => {
          setIsDrawerOpen(true);
        }}>
        <SmallWallet className={'flex-none'} />
      </div>
      <CommonDrawer
        title="Portkey Wallet"
        height="100%"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}>
        <Address />
      </CommonDrawer>
    </>
  );
}
