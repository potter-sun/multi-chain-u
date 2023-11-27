import React, { useState } from 'react';
import clsx from 'clsx';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import CommonDrawer from 'components/CommonDrawer';
import { MENU_ITEMS } from 'constants/home';
import styles from './styles.module.scss';

export default function SelectMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className={clsx('flex-none', 'flex-row-center', styles['header-icon-wrapper'])}
        onClick={() => {
          setIsDrawerOpen(true);
        }}>
        <MenuOutlined className={styles['header-icon']} rev />
      </div>
      <CommonDrawer height="100%" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {MENU_ITEMS.map((item) => (
          <div
            key={item.key}
            className={clsx('flex-center', styles['drawer-item'])}
            onClick={() => {
              setIsDrawerOpen(false);
            }}>
            {item.label}
          </div>
        ))}
      </CommonDrawer>
    </>
  );
}
