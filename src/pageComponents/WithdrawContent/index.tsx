import React, { useState, useMemo } from 'react';
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
import { formatWithThousandsSeparator, parserWithThousandsSeparator } from 'utils/common';
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
    maxAmount: '1,000,000',
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

  const remainingLimitComponent = useMemo(() => {
    return (
      <div className={clsx('flex-row-center', styles['remaining-limit-wrapper'])}>
        <span className={styles['remaining-limit-label']}>
          {isMobilePX && '• '}Remaining Limit{isMobilePX && ':'}
        </span>
        <span className={styles['remaining-limit-value']}>
          {withdrawalInfo.remainingLimit} {withdrawalInfo.limitCurrency} /{' '}
          {withdrawalInfo.totalLimit} {withdrawalInfo.limitCurrency}
        </span>
      </div>
    );
  }, [
    withdrawalInfo.limitCurrency,
    withdrawalInfo.remainingLimit,
    withdrawalInfo.totalLimit,
    isMobilePX,
  ]);

  return (
    <>
      <SelectChainWrapper mobileLabel="from" webLabel="Withdraw USDT from" />
      <div>
        <Form
          className={styles['form-wrapper']}
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
              textareaProps={{
                placeholder: 'Enter an address',
              }}
            />
          </Form.Item>
          <Form.Item
            label="Withdrawal Network"
            name={FormKeys.NETWORK}
            rules={[{ required: true, message: 'Please select network!' }]}>
            <SelectNetwork
              isFormItem
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
            />
          </Form.Item>
          <div className={clsx('flex-row-start', styles['info-wrapper-contract-address'])}>
            <div className={clsx('flex-none', styles['info-label'])}>Contract Address</div>
            <div
              className={clsx(
                'flex-1',
                'text-right',
                'text-underline',
                'text-break',
                styles['info-value'],
              )}>
              0xc2132D05D31c914a87C66C10748AEb04B58e8F
            </div>
          </div>
          <Form.Item
            label={
              <div className={clsx('flex-row-between', styles['form-label-wrapper'])}>
                <span className={styles['form-label']}>Withdrawal Amount</span>
                {!isMobilePX && remainingLimitComponent}
              </div>
            }
            name={FormKeys.AMOUNT}
            validateTrigger="onBlur"
            rules={[
              {
                validator: (_, value) => {
                  const parserNumber = Number(parserWithThousandsSeparator(value));
                  if (!value) {
                    return Promise.reject('Please input amount!');
                  } else if (
                    parserNumber < Number(parserWithThousandsSeparator(withdrawalInfo.minAmount))
                  ) {
                    return Promise.reject(`The minimum amount is ${withdrawalInfo.minAmount} USDT`);
                  } else if (
                    parserNumber > Number(parserWithThousandsSeparator(withdrawalInfo.maxAmount))
                  ) {
                    return Promise.reject('Insufficient balance.');
                  }
                  return Promise.resolve();
                },
              },
            ]}>
            <FormInputNumber
              unit={withdrawalInfo.transactionUnit}
              maxButtonConfig={{
                onClick: () => {
                  form.setFieldValue(FormKeys.AMOUNT, withdrawalInfo.maxAmount);
                  form.validateFields([FormKeys.AMOUNT]);
                },
              }}
              inputNumberProps={{
                placeholder: `Minimum ${withdrawalInfo.minAmount}`,
                formatter: formatWithThousandsSeparator,
                parser: parserWithThousandsSeparator,
              }}
              onChange={(value) => {
                form.setFieldValue(FormKeys.AMOUNT, formatWithThousandsSeparator(value));
              }}
            />
          </Form.Item>
          <div className={clsx('flex-row-center', styles['info-wrapper'])}>
            <div className={styles['info-label']}>{withdrawalInfo.transactionUnit} Balance</div>
            <div className={styles['info-value']}>
              {balance} {withdrawalInfo.transactionUnit}
            </div>
          </div>
          {isMobilePX && remainingLimitComponent}
          <div className={styles['form-footer']}>
            <div className={clsx('flex-1', 'flex-column', styles['transaction-info-wrapper'])}>
              <div className={clsx('flex-row-center', styles['info-wrapper'])}>
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
