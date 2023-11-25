import { handleErrorMessage } from '@portkey/did-ui-react';
import { request } from 'api';
import {
  CreateWithdrawOrderRequest,
  CreateWithdrawOrderResult,
  GetDepositInfoResult,
  GetNetworkListResult,
  GetTokenListResult,
  GetWithdrawInfoResult,
  SendWithdrawTransactionRequest,
} from 'types/api';

export const getTokenList = async (): Promise<GetTokenListResult> => {
  try {
    const res = await request.deposit.getTokenList();
    return res.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getTokenList error'));
  }
};

export const getNetworkList = async (): Promise<GetNetworkListResult> => {
  try {
    const res = await request.deposit.getNetworkList();
    return res.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getNetworkList error'));
  }
};

export const getDepositInfo = async (): Promise<GetDepositInfoResult> => {
  try {
    const res = await request.deposit.getDepositInfo();
    return res.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getDepositInfo error'));
  }
};

export const getWithdrawInfo = async (): Promise<GetWithdrawInfoResult> => {
  try {
    const res = await request.deposit.getWithdrawInfo();
    return res.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getWithdrawInfo error'));
  }
};

export const createWithdrawOrder = async (
  params: CreateWithdrawOrderRequest,
): Promise<CreateWithdrawOrderResult> => {
  try {
    const res = await request.deposit.createWithdrawOrder({ data: params });
    return res.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'createWithdrawOrder error'));
  }
};

export const sendWithdrawTransaction = async (
  params: SendWithdrawTransactionRequest,
): Promise<void> => {
  try {
    await request.deposit.sendWithdrawTransaction({ data: params });
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'sendWithdrawTransaction error'));
  }
};
