import { Swap } from 'assets/images';
import { useState, useEffect } from 'react';
import { NetworkItem } from 'types/api';
import styles from './styles.module.scss';
import { useCommon } from 'store/Provider/hooks';
import NetworkSelectDrawer from 'pageComponents/NetworkSelectDrawer';
import NetworkSelectDropdown from 'pageComponents/NetworkSelectDropdown';
import clsx from 'clsx';

type NetworkSelectProps = {
  networkList: NetworkItem[];
  value?: NetworkItem;
  onChange?: (item: NetworkItem) => void;
};

export default function SelectNetwork({ networkList, value, onChange }: NetworkSelectProps) {
  const [isShowNetworkSelectDropdown, setIsShowNetworkSelectDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState<NetworkItem>();

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const onSelectNetwork = (item: NetworkItem) => {
    if (onChange) {
      onChange(item);
    } else {
      setSelected(item);
    }
    setIsShowNetworkSelectDropdown(false);
  };
  const { isMobilePX } = useCommon();

  return (
    <div className={styles['select-network']}>
      <div
        id="select-network-result"
        className={clsx(styles['select-network-result'], {
          [styles['select-network-result-mobile']]: isMobilePX,
        })}
        onClick={() => setIsShowNetworkSelectDropdown(true)}>
        <div className={styles['select-network-label']}>From Network</div>
        <div className={styles['select-network-value-row']}>
          <div className={styles['select-network-value']}>
            {selected?.network ? (
              <span className={styles['select-network-value-selected']}>
                <span className={styles['network']}>{selected.network}</span>
                <span className={styles['name']}>{selected.name}</span>
              </span>
            ) : (
              <span className={styles['select-network-value-placeholder']}>Select a network</span>
            )}
          </div>
          <Swap className={styles['select-network-swap-icon']} />
        </div>
      </div>

      {isMobilePX ? (
        <NetworkSelectDrawer
          open={isShowNetworkSelectDropdown}
          onClose={() => setIsShowNetworkSelectDropdown(false)}
          networkList={networkList}
          selectedNetwork={selected?.network}
          onSelect={onSelectNetwork}
        />
      ) : (
        <NetworkSelectDropdown
          open={isShowNetworkSelectDropdown}
          networkList={networkList}
          selectedNetwork={selected?.network}
          onSelect={onSelectNetwork}
          onClose={() => setIsShowNetworkSelectDropdown(false)}
        />
      )}
    </div>
  );
}
