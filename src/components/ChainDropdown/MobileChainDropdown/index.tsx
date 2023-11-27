import React, { useState } from 'react';
import { Dropdown } from 'antd';
import clsx from 'clsx';
import SmallDownIcon from 'assets/images/smallDown.svg';
import { CommonChainDropdownProps } from '../types';
import styles from './styles.module.scss';

export default function MobileChainDropdown({
  chainId,
  menuItems,
  selectedKeys,
  onClick,
}: CommonChainDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      overlayClassName={styles['chain-dropdown']}
      trigger={['click']}
      menu={{
        items: menuItems,
        selectedKeys,
        onClick,
      }}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}>
      <div className={clsx('flex-row-center', styles['children-container'])}>
        <div className={styles['trigger-text']}>{chainId}</div>
        <SmallDownIcon
          className={clsx('flex-none', styles['children-icon'], {
            [styles['children-icon-rotate']]: isOpen,
          })}
        />
      </div>
    </Dropdown>
  );
}
