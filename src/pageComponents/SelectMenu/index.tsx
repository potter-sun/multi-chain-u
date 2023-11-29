import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import CommonDrawer from 'components/CommonDrawer';
import { MENU_ITEMS, HomeMenuKey } from 'constants/home';
import { setActiveMenuKey } from 'store/reducers/common/slice';
import { store } from 'store/Provider/store';
import { useCommon } from 'store/Provider/hooks';
import styles from './styles.module.scss';

export default function SelectMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { activeMenuKey } = useCommon();

  useEffect(() => {
    // init activeMenuKey
    if (!activeMenuKey) {
      store.dispatch(setActiveMenuKey(HomeMenuKey.Deposit));
    }
  }, [activeMenuKey]);

  return (
    <>
      <div
        className={clsx('flex-none', 'flex-row-center', styles['header-icon-wrapper'])}
        onClick={() => {
          setIsDrawerOpen(true);
        }}>
        <MenuOutlined className={styles['header-icon']} rev />
      </div>
      <CommonDrawer
        className={clsx(styles['menu-drawer'], styles['menu-drawer-weight'])}
        height="100%"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}>
        {MENU_ITEMS.map((item) => (
          <div
            key={item.key}
            className={clsx('flex-row-center', styles['menu-item'], {
              [styles['menu-item-active']]: item.key === activeMenuKey,
            })}
            onClick={() => {
              store.dispatch(setActiveMenuKey(item.key));
              setIsDrawerOpen(false);
            }}>
            <div className={styles['menu-item-icon']} />
            <div>{item.label}</div>
          </div>
        ))}
      </CommonDrawer>
    </>
  );
}
