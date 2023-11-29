import { Swap } from 'assets/images';
import { useState, useEffect } from 'react';
import { NetworkItem } from 'types/api';
import styles from './styles.module.scss';
import { useCommon } from 'store/Provider/hooks';
import NetworkSelectDrawer from 'pageComponents/NetworkSelectDrawer';
import NetworkSelectDropdown from 'pageComponents/NetworkSelectDropdown';
import Down from 'assets/images/down.svg';
import clsx from 'clsx';

type NetworkSelectProps = {
  isFormItem?: boolean;
  networkList: NetworkItem[];
  value?: NetworkItem;
  onChange?: (item: NetworkItem) => void;
};

export default function SelectNetwork({
  isFormItem,
  networkList,
  value,
  onChange,
}: NetworkSelectProps) {
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
          [styles['select-network-result-form-item']]: isFormItem,
        })}
        onClick={() => setIsShowNetworkSelectDropdown(true)}>
        {!isFormItem && <div className={styles['select-network-label']}>From Network</div>}
        <div className={styles['select-network-value-row']}>
          <div className={styles['select-network-value']}>
            {selected?.network ? (
              <span className={clsx('flex-row-center', styles['select-network-value-selected'])}>
                {isMobilePX ? (
                  <span className={styles['primary']}>{selected.name}</span>
                ) : (
                  <>
                    <span className={styles['primary']}>{selected.network}</span>
                    <span className={styles['secondary']}>{selected.name}</span>
                  </>
                )}
              </span>
            ) : (
              <span className={styles['select-network-value-placeholder']}>Select network</span>
            )}
          </div>
          {isFormItem ? (
            <Down
              className={clsx({
                [styles['select-network-down-icon-rotate']]: isShowNetworkSelectDropdown,
              })}
            />
          ) : (
            <Swap className={styles['select-network-swap-icon']} />
          )}
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
