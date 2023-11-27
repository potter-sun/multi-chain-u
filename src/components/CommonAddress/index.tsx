import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface CommonAddressProps {
  labelClassName?: string;
  valueClassName?: string;
  label?: string;
  value?: string;
}

export default function CommonAddress({
  labelClassName,
  valueClassName,
  label = 'MainChain AELF',
  value = 'ELF_2DKgy7GafbrYWGnhSC3iSYgM9ZfudYS2KLLr1rDPLF9nZfWA6G_AELF',
}: CommonAddressProps) {
  return (
    <div>
      <div className={clsx(styles['address-text-title'], labelClassName)}>{label}</div>
      <div className={'flex-row-center'}>
        <div className={clsx(styles['address-text-content'], valueClassName)}>{value}</div>
        <div className={clsx('flex-none', styles['address-text-copy'])} />
      </div>
    </div>
  );
}
