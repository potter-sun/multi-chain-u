import React from 'react';
import clsx from 'clsx';
import { useCommon } from 'store/Provider/hooks';
import styles from './styles.module.scss';

export default function DepositDescription() {
  const { isMobile } = useCommon();
  return (
    <div
      className={clsx(styles['description-wrapper'], {
        [styles['mobile-description-wrapper']]: isMobile,
      })}>
      <p>• Deposits will be credited and available for trading after Bundle 1 confirmation.</p>
      <p>
        • Deposits will be unlocked and available for withdrawal/other activities after Bundle 2
        confirmation.
      </p>
    </div>
  );
}
