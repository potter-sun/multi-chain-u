import React from 'react';
import DepositContent from 'pageComponents/DepositContent';
import WithdrawContent from 'pageComponents/WithdrawContent';
import { useCommon } from 'store/Provider/hooks';
import { SideMenuKey } from 'constants/home';
import styles from './styles.module.scss';

export default function Content() {
  const { activeMenuKey } = useCommon();
  const content =
    activeMenuKey === SideMenuKey.Withdrawal ? <WithdrawContent /> : <DepositContent />;
  return <div className={styles['content-container']}>{content}</div>;
}
