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
  label,
  value,
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
