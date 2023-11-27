import clsx from 'clsx';
import styles from './styles.module.scss';

interface NetworkCardProps {
  name: string;
  multiConfirmTime: string;
  multiConfirm: string;
  className?: string;
  onClick: () => void;
}

interface NetworkCardForWebProps extends NetworkCardProps {
  network: string;
}

export function NetworkCardForMobile({
  className,
  name,
  multiConfirmTime,
  multiConfirm,
  onClick,
}: NetworkCardProps) {
  return (
    <div className={clsx(styles['network-card-for-mobile'], className)} onClick={onClick}>
      <div className={styles['network-card-name']}>{name}</div>
      <div className={styles['network-card-arrival-time']}>
        <span>{`Est. arrival ≈ `}</span>
        <span> {multiConfirmTime}</span>
      </div>
      <div className={styles['network-card-confirm-time']}>{multiConfirm}</div>
    </div>
  );
}

export function NetworkCardForWeb({
  className,
  network,
  name,
  multiConfirmTime,
  multiConfirm,
  onClick,
}: NetworkCardForWebProps) {
  return (
    <div
      className={clsx('flex-column', styles['network-card-for-web'], className)}
      onClick={onClick}>
      <div className={clsx('flex-row-center-between', styles['network-card-row'])}>
        <span className={styles['network-card-network']}>{network}</span>
        <span className={styles['network-card-arrival-time']}>≈ {multiConfirmTime}</span>
      </div>
      <div className={clsx('flex-row-center-between', styles['network-card-row'])}>
        <span className={styles['network-card-name']}>{name}</span>
        <span className={styles['network-card-confirm-time']}>{multiConfirm}</span>
      </div>
    </div>
  );
}
