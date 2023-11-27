import React from 'react';
import BaseDropdown from 'components/BaseDropdown';
import { CommonChainDropdownProps } from '../types';
import styles from './styles.module.scss';

export default function ChainDropdown({
  chainId,
  menuItems,
  selectedKeys,
  onClick,
}: CommonChainDropdownProps) {
  return (
    <BaseDropdown
      overlayClassName={styles['chain-dropdown']}
      menu={{
        items: menuItems,
        selectedKeys,
        onClick,
      }}>
      <div className={styles['trigger-text']}>{chainId}</div>
    </BaseDropdown>
  );
}
