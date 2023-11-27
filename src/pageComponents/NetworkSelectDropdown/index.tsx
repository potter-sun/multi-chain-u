import clsx from 'clsx';
import styles from './styles.module.scss';
import { NetworkSelectForWeb, NetworkSelectProps } from 'pageComponents/NetworkSelect';

interface NetworkSelectDropdownProps extends NetworkSelectProps {
  open: boolean;
  onClose: () => void;
}

export default function NetworkSelectDropdown({
  open = false,
  networkList,
  selectedNetwork,
  onSelect,
  onClose,
}: NetworkSelectDropdownProps) {
  return (
    <div className={styles['network-select-dropdown']}>
      <div
        className={clsx(
          styles['network-select-dropdown-mask'],
          open ? styles['network-select-dropdown-show'] : styles['network-select-dropdown-hidden'],
        )}
        onClick={onClose}></div>
      <div
        className={clsx(
          styles['network-select-dropdown'],
          open ? styles['network-select-dropdown-show'] : styles['network-select-dropdown-hidden'],
        )}>
        <NetworkSelectForWeb
          networkList={networkList}
          selectedNetwork={selectedNetwork}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
