import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

export default function Address() {
  return (
    <div>
      <div className={styles['address-text-title']}>Deposit Address</div>
      <div className={'flex-row-center'}>
        <div className={styles['address-text-content']}>
          0xd1239088f064e7ebca40f71305572f8143373659d4v5gg670h
        </div>
        <div className={clsx('flex-none', styles['address-text-copy'])} />
      </div>
    </div>
  );
}
