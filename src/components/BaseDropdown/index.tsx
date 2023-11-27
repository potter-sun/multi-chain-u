import React, { useState } from 'react';
import { Dropdown, DropdownProps } from 'antd';
import DownIcon from 'assets/images/down.svg';
import clsx from 'clsx';
import styles from './styles.module.scss';

export default function BaseDropdown({ children, ...props }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      trigger={['click']}
      {...props}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}>
      <div className={clsx('cursor-pointer', 'flex-row-center', styles['children-container'])}>
        {children}
        <DownIcon
          className={clsx('flex-none', styles['children-icon'], {
            [styles['children-icon-rotate']]: isOpen,
          })}
        />
      </div>
    </Dropdown>
  );
}
