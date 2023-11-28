import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, Form, FormProps } from 'antd';
import SelectChain from 'components/SelectChain';
import FormInput from 'components/FormInput';
import FormInputNumber from 'components/FormInputNumber';
import SelectNetwork from 'pageComponents/SelectNetwork';
import { NetworkStatus, NetworkItem, WithdrawInfo } from 'types/api';
import { formatWithThousandsSeparator } from 'utils/common';
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
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const onFieldsChange: FormProps['onFieldsChange'] = (_, allFields) => {
    const errors = form.getFieldsError();
    const isDisabled =
      errors.some((field) => field.errors.length > 0) ||
      allFields.some((field) => typeof field.value === 'undefined' || field.value === '');
    setIsSubmitDisabled(isDisabled);
  };

  const onSubmit = () => {
    console.log('submit', form.getFieldsValue());
  };

  return (
    <>
      <div className={clsx('flex-row-center', styles['chain-select-wrapper'])}>
        <span className={styles['withdraw-text']}>Withdraw USDT from</span>
        <SelectChain />
      </div>
      <div>
        <Form layout="vertical" form={form} onFieldsChange={onFieldsChange} onFinish={onSubmit}>
          <Form.Item
            label="Withdrawal Address"
            name={FormKeys.ADDRESS}
            rules={[{ required: true, message: 'Please input address!' }]}>
            <FormInput
              placeholder="Enter an address"
              value={form.getFieldsValue()[FormKeys.ADDRESS]}
              onChange={(value) => {
                form.setFieldValue(FormKeys.ADDRESS, value);
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
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isSubmitDisabled}>
              Withdraw
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
