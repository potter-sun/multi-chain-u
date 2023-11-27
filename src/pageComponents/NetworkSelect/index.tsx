import clsx from 'clsx';
import styles from './styles.module.scss';
import { NetworkItem } from 'types/api';
import Info from 'assets/images/info.svg';
import { NetworkCardForMobile, NetworkCardForWeb } from 'pageComponents/NetworkCard';

export interface NetworkSelectProps {
  className?: string;
  networkList: NetworkItem[];
  selectedNetwork?: string;
  onSelect: (item: NetworkItem) => void;
}

const TipContent =
  'Note: Only supported networks are shown, if you deposit via another network your assets may be lost.';

function NetworkSelectTip() {
  return (
    <div className={styles['network-select-tip']}>
      <Info className={styles['network-select-tip-icon']} />
      <span className={styles['network-select-tip-text']}>{TipContent}</span>
    </div>
  );
}

export function NetworkSelectForMobile({
  className,
  networkList,
  selectedNetwork,
  onSelect,
}: NetworkSelectProps) {
  return (
    <div className={clsx(styles['network-select'], styles['network-select-for-mobile'], className)}>
      <NetworkSelectTip />
      <div className={styles['network-select-list']}>
        {networkList.map((item, idx) => {
          return (
            <NetworkCardForMobile
              key={'network-select' + item.network + idx}
              className={
                selectedNetwork == item.network ? styles['network-card-selected'] : undefined
              }
              name={item.name}
              multiConfirmTime={item.multiConfirmTime}
              multiConfirm={item.multiConfirm}
              onClick={() => onSelect(item)}
            />
          );
        })}
      </div>
    </div>
  );
}

export function NetworkSelectForWeb({
  className,
  networkList,
  selectedNetwork,
  onSelect,
}: NetworkSelectProps) {
  return (
    <div className={clsx(styles['network-select'], styles['network-select-for-web'], className)}>
      <NetworkSelectTip />
      <div className={styles['network-select-list']}>
        {networkList.map((item, idx) => {
          return (
            <NetworkCardForWeb
              key={'network-select' + item.network + idx}
              className={
                selectedNetwork == item.network ? styles['network-card-selected'] : undefined
              }
              network={item.network}
              name={item.name}
              multiConfirmTime={item.multiConfirmTime}
              multiConfirm={item.multiConfirm}
              onClick={() => onSelect(item)}
            />
          );
        })}
      </div>
    </div>
  );
}
