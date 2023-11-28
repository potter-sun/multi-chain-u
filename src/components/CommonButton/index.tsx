import { Button, ButtonProps } from 'antd';
import clsx from 'clsx';
import styles from './styles.module.scss';

export default function CommonButton(props: ButtonProps) {
  return <Button {...props} className={clsx(styles['common-button'], props.className)} />;
}
