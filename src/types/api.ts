import { ChainId } from '@portkey/provider-types';

export enum BusinessType {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
}

export type GetTokenListRequest = {
  type: BusinessType;
  chainId: ChainId;
};

export type GetTokenListResult = {
  tokenList: TokenItem[];
};

export type TokenItem = {
  name: string;
  symbol: string;
  icon: string;
};

export type GetNetworkListRequest = {
  type: BusinessType;
  chainId: ChainId;
  symbol: string;
};

export type GetNetworkListResult = {
  networkList: NetworkItem[];
};

export type NetworkItem = {
  network: string;
  name: string;
  multiConfirm: string;
  multiConfirmTime: string;
  contractAddress: string;
  explorerUrl: string;
  status: NetworkStatus;
};

export enum NetworkStatus {
  Health = 'Health',
  Congesting = 'Congesting',
}

export type GetDepositInfoRequest = {
  chainId: ChainId;
  network: string;
  symbol: string;
};

export type GetDepositInfoResult = {
  depositInfo: DepositInfo;
};

export type DepositInfo = {
  depositAddress: string;
  maxAmount: string;
  minAmount: string;
  limitCurrency: string;
  totalLimit: string;
  remainingLimit: string;
  transactionFee: string;
  transactionUnit: string;
};

export type GetWithdrawInfoRequest = {
  chainId: ChainId;
  network: string;
  symbol: string;
  amount: string;
  address: string;
};

export type GetWithdrawInfoResult = {
  withdrawInfo: WithdrawInfo;
};

export type WithdrawInfo = {
  maxAmount: string;
  minAmount: string;
  limitCurrency: string;
  totalLimit: string;
  remainingLimit: string;
  transactionFee: string;
  transactionUnit: string;
  receiveAmount: string;
  feeList: FeeItem[];
};

export type FeeItem = {
  name: string;
  currency: string;
  amount: string;
};

export type CreateWithdrawOrderRequest = {
  network: string;
  symbol: string;
  amount: string;
  fromChainId: ChainId;
  toAddress: string;
};

export type CreateWithdrawOrderResult = {
  orderId: string;
  withdrawAddress: string;
};

export type SendWithdrawTransactionRequest = {
  orderId: string;
  rawTransaction: string;
  signature: string;
  publicKey: string;
};
