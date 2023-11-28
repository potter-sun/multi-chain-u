import CommonModalSwitchDrawer, {
  CommonModalSwitchDrawerProps,
} from 'components/CommonModalSwitchDrawer';
import { NetworkItem } from 'types/api';
import { ChainId } from '@portkey/provider-types';

interface SuccessModalProps {
  withdrawInfo: {
    symbol: string;
    amount: string;
    receiveAmount: string;
    chainId: ChainId;
    network: NetworkItem;
    arriveTime: string;
  };
  modalProps: CommonModalSwitchDrawerProps;
}

export default function SuccessModal({ withdrawInfo, modalProps }: SuccessModalProps) {
  return (
    <CommonModalSwitchDrawer {...modalProps}>
      <div>
        <div>Withdraw Amount: {`${withdrawInfo.amount} ${withdrawInfo.symbol}`}</div>
        <div>
          from {withdrawInfo.chainId} to {withdrawInfo.network.name}
        </div>
        <div>Receive Amount: {`${withdrawInfo.receiveAmount} ${withdrawInfo.symbol}`}</div>
        <div>Est. to arrive in: {withdrawInfo.arriveTime}</div>
      </div>
    </CommonModalSwitchDrawer>
  );
}
