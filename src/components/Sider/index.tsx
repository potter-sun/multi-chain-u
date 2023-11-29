import React, { useEffect } from 'react';
import { Space } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import clsx from 'clsx';
import { setActiveMenuKey } from 'store/reducers/common/slice';
import { store } from 'store/Provider/store';
import { useCommon } from 'store/Provider/hooks';
import { SideMenuKey, MENU_ITEMS } from 'constants/home';
import styles from './styles.module.scss';

export default function Sider() {
  const { activeMenuKey } = useCommon();
  useEffect(() => {
    // init activeMenuKey
    if (!activeMenuKey) {
      store.dispatch(setActiveMenuKey(SideMenuKey.Deposit));
    }
  }, [activeMenuKey]);
  return (
    <div className={styles['menu-container']}>
      <Space className={styles['menu-items-wrapper']} direction="vertical">
        {MENU_ITEMS.map((item) => (
          <div
            key={item.key}
            className={clsx('cursor-pointer', 'flex-row-center', styles['menu-item'], {
              [styles['menu-item-active']]: item.key === activeMenuKey,
            })}
            onClick={() => {
              store.dispatch(setActiveMenuKey(item.key));
            }}>
            <UserOutlined className={clsx('flex-none', styles['menu-item-icon'])} rev />
            <span className={styles['menu-item-text']}>{item.label}</span>
          </div>
        ))}
      </Space>
    </div>
  );
}
