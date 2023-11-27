import { Swap } from 'assets/images';
import { useState } from 'react';
import { NetworkItem } from 'types/api';
import styles from './styles.module.scss';
import { useCommon } from 'store/Provider/hooks';
import NetworkSelectDrawer from 'pageComponents/NetworkSelectDrawer';
import NetworkSelectDropdown from 'pageComponents/NetworkSelectDropdown';

export function SelectNetwork({ networkList }: { networkList: NetworkItem[] }) {
  const [isShowNetworkSelectDropdown, setIsShowNetworkSelectDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState<NetworkItem>();

  const onSelectNetwork = (item: NetworkItem) => {
    setSelected(item);
    setIsShowNetworkSelectDropdown(false);
  };
  const { isMobile } = useCommon();

  return (
    <div className={styles['select-network']}>
      <div
        id="select-network-result"
        className={styles['select-network-result']}
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

      {isMobile ? (
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
