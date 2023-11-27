import { Swap } from 'assets/images';
import { useState } from 'react';
import { NetworkItem } from 'types/api';
import styles from './styles.module.scss';
import { NetworkSelectForWeb } from 'pageComponents/NetworkSelect';
import clsx from 'clsx';
import { useCommon } from 'store/Provider/hooks';
import NetworkSelectDrawer from 'pageComponents/NetworkSelectDrawer';

export default function SelectNetwork({ networkList }: { networkList: NetworkItem[] }) {
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
        className={clsx(styles['select-network-result'], {
          [styles['select-network-result-mobile']]: isMobile,
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
      {/* TODO mask and mask close*/}
      {isMobile ? (
        <NetworkSelectDrawer
          open={isShowNetworkSelectDropdown}
          onClose={() => setIsShowNetworkSelectDropdown(false)}
          networkList={networkList}
          selectedNetwork={selected?.network}
          onSelect={onSelectNetwork}
        />
      ) : (
        <div
          className={clsx(
            styles['network-select-dropdown'],
            isShowNetworkSelectDropdown
              ? styles['network-select-dropdown-show']
              : styles['network-select-dropdown-hidden'],
          )}>
          <NetworkSelectForWeb
            networkList={networkList}
            selectedNetwork={selected?.network}
            onSelect={onSelectNetwork}
          />
        </div>
      )}
    </div>
  );
}
