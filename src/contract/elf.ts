import { ContractBasic } from "utils/contract";

export const getELFChainBalance = async (
  tokenContract: ContractBasic,
  symbol: string,
  account: string,
) => {
  const balance = await tokenContract.callViewMethod('GetBalance', {
    symbol: symbol,
    owner: account,
  });
  return balance?.balance ?? balance?.amount ?? 0;
};
