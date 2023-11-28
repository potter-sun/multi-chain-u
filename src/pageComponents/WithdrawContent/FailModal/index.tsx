import CommonModalSwitchDrawer, {
  CommonModalSwitchDrawerProps,
} from 'components/CommonModalSwitchDrawer';

interface FailModalProps {
  failReason: string;
  modalProps: CommonModalSwitchDrawerProps;
}

export default function FailModal({ failReason, modalProps }: FailModalProps) {
  return (
    <CommonModalSwitchDrawer {...modalProps}>
      <div>{failReason}</div>
    </CommonModalSwitchDrawer>
  );
}
