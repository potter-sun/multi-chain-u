import CommonModalSwitchDrawer, {
  CommonModalSwitchDrawerProps,
} from 'components/CommonModalSwitchDrawer';
import { FeeItem, NetworkItem } from 'types/api';

interface DoubleCheckModalProps {
  withdrawInfo: {
    receiveAmount: string;
    address: string;
    network: NetworkItem;
    amount: string;
    transactionFee: FeeItem;
    symbol: string;
  };
  modalProps: CommonModalSwitchDrawerProps;
}

export default function DoubleCheckModal({ withdrawInfo, modalProps }: DoubleCheckModalProps) {
  return (
    <CommonModalSwitchDrawer {...modalProps} title="Withdrawal Information">
      <div>
        <div>Receive Amount: {`${withdrawInfo.receiveAmount} ${withdrawInfo.symbol}`}</div>
        <div>Withdrawal Address: {withdrawInfo.address}</div>
        <div>Withdrawal Network: {withdrawInfo.network.name}</div>
        <div>Withdraw Amount: {`${withdrawInfo.amount} ${withdrawInfo.symbol}`}</div>
        <div>
          Transaction Fee:
          {`${withdrawInfo.transactionFee.amount} ${withdrawInfo.transactionFee.currency}`}
        </div>
      </div>
    </CommonModalSwitchDrawer>
  );
}
