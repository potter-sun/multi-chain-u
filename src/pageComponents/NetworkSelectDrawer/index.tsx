import { DrawerProps } from 'antd';
import CommonDrawer from 'components/CommonDrawer';
import { NetworkSelectForMobile, NetworkSelectProps } from 'pageComponents/NetworkSelect';

export default function NetworkSelectDrawer({
  networkList,
  selectedNetwork,
  onSelect,
  ...props
}: NetworkSelectProps & DrawerProps) {
  return (
    <CommonDrawer
      destroyOnClose
      placement="bottom"
      title="Select Network"
      closable={true}
      height={724}
      {...props}>
      <NetworkSelectForMobile
        networkList={networkList}
        selectedNetwork={selectedNetwork}
        onSelect={onSelect}
      />
    </CommonDrawer>
  );
}
