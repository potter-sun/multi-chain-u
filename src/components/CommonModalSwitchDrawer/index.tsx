import { Modal } from 'antd';
import clsx from 'clsx';
import CommonDrawer from 'components/CommonDrawer';
import { useCommon } from 'store/Provider/hooks';
import styles from './styles.module.scss';

export interface CommonModalSwitchDrawerProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  open?: boolean;
  onClose?: () => void;
  onOk?: () => void;
}

export default function CommonModalSwitchDrawer({
  onClose,
  ...props
}: CommonModalSwitchDrawerProps) {
  const { isMobilePX } = useCommon();
  return isMobilePX ? (
    <CommonDrawer {...props} onClose={onClose} />
  ) : (
    <Modal {...props} onCancel={onClose} />
  );
}
