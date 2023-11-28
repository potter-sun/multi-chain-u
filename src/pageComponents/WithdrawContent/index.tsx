import React, { useState } from 'react';
import { Form, FormProps } from 'antd';
import clsx from 'clsx';
import SelectChainWrapper from 'pageComponents/SelectChainWrapper';
import CommonButton from 'components/CommonButton';
import FormTextarea from 'components/FormTextarea';
import FormInputNumber from 'components/FormInputNumber';
import SelectNetwork from 'pageComponents/SelectNetwork';
import DoubleCheckModal from './DoubleCheckModal';
import SuccessModal from './SuccessModal';
import FailModal from './FailModal';
import { NetworkStatus, NetworkItem, WithdrawInfo } from 'types/api';
import { formatWithThousandsSeparator } from 'utils/common';
import { useCommon } from 'store/Provider/hooks';
import styles from './styles.module.scss';

enum FormKeys {
  ADDRESS = 'address',
  NETWORK = 'network',
  AMOUNT = 'amount',
}

type FormValuesType = {
  [FormKeys.ADDRESS]: string;
  [FormKeys.NETWORK]: NetworkItem;
  [FormKeys.AMOUNT]: string;
};

export default function WithdrawContent() {
  const { isMobilePX } = useCommon();

  const [form] = Form.useForm<FormValuesType>();

  const [withdrawalInfo, setWithdrawalInfo] = useState<WithdrawInfo>({
    maxAmount: '100,000',
    minAmount: '5',
    limitCurrency: 'USDT',
    totalLimit: '1,000,000',
    remainingLimit: '1,000,000',
    transactionFee: '1.5',
    transactionUnit: 'USDT',
    receiveAmount: '18,000',
    feeList: [],
  });
  const [balance, setBalance] = useState('100,000');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isDoubleCheckModalOpen, setIsDoubleCheckModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  const onFieldsChange: FormProps['onFieldsChange'] = (_, allFields) => {
    const errors = form.getFieldsError();
    const isDisabled =
      errors.some((field) => field.errors.length > 0) ||
      allFields.some((field) => typeof field.value === 'undefined' || field.value === '');
    setIsSubmitDisabled(isDisabled);
  };

  const onSubmit = () => {
    console.log('submit', form.getFieldsValue());
    setIsDoubleCheckModalOpen(true);
  };

  return (
    <>
      <SelectChainWrapper mobileLabel="from" webLabel="Withdraw USDT from" />
      <div>
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFieldsChange={onFieldsChange}
          onFinish={onSubmit}>
          <Form.Item
            label="Withdrawal Address"
            name={FormKeys.ADDRESS}
            rules={[{ required: true, message: 'Please input address!' }]}>
            <FormTextarea
              placeholder="Enter an address"
              value={form.getFieldsValue()[FormKeys.ADDRESS]}
              onChange={(e) => {
                form.setFieldValue(FormKeys.ADDRESS, e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Withdrawal Network"
            name={FormKeys.NETWORK}
            rules={[{ required: true, message: 'Please select network!' }]}>
            <SelectNetwork
              networkList={[
                {
                  network: 'network',
                  name: 'name',
                  multiConfirm: 'multiConfirm',
                  multiConfirmTime: 'multiConfirmTime',
                  contractAddress: 'contractAddress',
                  explorerUrl: 'explorerUrl',
                  status: NetworkStatus.Health,
                },
              ]}
              value={form.getFieldsValue()[FormKeys.NETWORK]}
              onChange={(value) => {
                form.setFieldValue(FormKeys.NETWORK, value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Withdrawal Amount"
            name={FormKeys.AMOUNT}
            rules={[{ required: true, message: 'Please input amount!' }]}>
            <FormInputNumber
              placeholder={`Minimum ${withdrawalInfo.minAmount}`}
              min={withdrawalInfo.minAmount}
              max={withdrawalInfo.maxAmount}
              value={form.getFieldsValue()[FormKeys.AMOUNT]}
              onChange={(value) => {
                form.setFieldValue(FormKeys.AMOUNT, formatWithThousandsSeparator(value));
              }}
            />
          </Form.Item>
          <div className={'flex-row-center'}>
            <div className={styles['info-label']}>{withdrawalInfo.transactionUnit} Balance</div>
            <div className={styles['info-value']}>
              {balance} {withdrawalInfo.transactionUnit}
            </div>
          </div>
          <div>
            Remaining Limit: {withdrawalInfo.remainingLimit} {withdrawalInfo.limitCurrency}/
            {withdrawalInfo.totalLimit} {withdrawalInfo.limitCurrency}
          </div>
          <div className={styles['form-footer']}>
            <div className={clsx('flex-1', 'flex-column', styles['transaction-info-wrapper'])}>
              <div className={'flex-row-center'}>
                <div className={styles['info-label']}>Transaction Fee: </div>
                <div className={styles['info-value']}>
                  {withdrawalInfo.transactionFee || '-'} {withdrawalInfo.transactionUnit}
                </div>
              </div>
              <div className={'flex-column'}>
                <div className={styles['info-label']}>Receive Amount</div>
                <div className={clsx(styles['info-value'], styles['info-value-big-font'])}>
                  {withdrawalInfo.receiveAmount || '-'} {withdrawalInfo.transactionUnit}
                </div>
              </div>
            </div>
            <Form.Item className={clsx('flex-none', styles['form-submit-button-wrapper'])}>
              <CommonButton
                className={styles['form-submit-button']}
                htmlType="submit"
                disabled={isSubmitDisabled}>
                Withdraw
              </CommonButton>
            </Form.Item>
          </div>
        </Form>
      </div>
      <DoubleCheckModal
        withdrawInfo={{
          receiveAmount: 'receiveAmount',
          address: 'address',
          network: {
            network: 'network',
            name: 'name',
            multiConfirm: 'multiConfirm',
            multiConfirmTime: 'multiConfirmTime',
            contractAddress: 'contractAddress',
            explorerUrl: 'explorerUrl',
            status: NetworkStatus.Health,
          },
          amount: 'amount',
          transactionFee: {
            amount: 'amount',
            currency: 'currency',
            name: 'name',
          },
          symbol: 'symbol',
        }}
        modalProps={{
          open: isDoubleCheckModalOpen,
          onClose: () => setIsDoubleCheckModalOpen(false),
          onOk: () => setIsDoubleCheckModalOpen(false),
        }}
      />
      <SuccessModal
        withdrawInfo={{
          symbol: 'symbol',
          amount: 'amount',
          receiveAmount: 'receiveAmount',
          chainId: 'AELF',
          network: {
            network: 'network',
            name: 'name',
            multiConfirm: 'multiConfirm',
            multiConfirmTime: 'multiConfirmTime',
            contractAddress: 'contractAddress',
            explorerUrl: 'explorerUrl',
            status: NetworkStatus.Health,
          },
          arriveTime: 'arriveTime',
        }}
        modalProps={{
          open: isSuccessModalOpen,
          onClose: () => setIsSuccessModalOpen(false),
          onOk: () => setIsSuccessModalOpen(false),
        }}
      />
      <FailModal
        failReason="failReason"
        modalProps={{
          open: isFailModalOpen,
          onClose: () => setIsFailModalOpen(false),
          onOk: () => setIsFailModalOpen(false),
        }}
      />
    </>
  );
}
