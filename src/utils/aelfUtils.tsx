import AElf from 'aelf-sdk';
import { AElfNodes } from 'constants/aelf';
import { isSymbol } from './reg';
import { SupportedELFChainId } from 'constants/index';
import { AelfInstancesKey, ChainId } from 'types';
import { isELFAddress } from './common';
import portkeyWalletProvider from 'provider/portkeyProvider';
import { handleManagerForwardCall, getContractMethods } from '@portkey/contracts';
import aelfInstance from './aelfInstance';
import { ManagerForwardCall } from 'constants/contract';

export function getNodeByChainId(chainId: ChainId) {
  return AElfNodes[chainId as AelfInstancesKey];
}

// const httpProviders: any = {};
export function getAElf(chainId: ChainId) {
  const rpc = getNodeByChainId(chainId).rpcUrl;
  // if (!httpProviders[rpc]) httpProviders[rpc] = new AElf(new AElf.providers.HttpProvider(rpc));
  return new AElf(new AElf.providers.HttpProvider(rpc));
}

export type EncodedTransfer = {
  contractAddress: string;
  params: EncodedTransferParams;
  methodName: string;
  chainId: SupportedELFChainId;
};

export type EncodedTransferParams = {
  symbol: string;
  to: string;
  amount: string;
  memo: string;
};

export const encodedTransfer = async ({
  contractAddress,
  params,
  methodName, // 'Transfer'
  chainId,
}: EncodedTransfer) => {
  // Get the protobuf definitions related to a contract
  const fileDescriptors = await getFileDescriptorsSet({ contractAddress, chainId });
  const inputType = fileDescriptors[2].methods[methodName].resolve().resolvedRequestType;
  let input = AElf.utils.transform.transformMapToArray(inputType, params);
  input = AElf.utils.transform.transform(inputType, input, AElf.utils.transform.INPUT_TRANSFORMERS);
  const message = inputType.fromObject(input);

  return inputType.encode(message).finish();
};

export type GetFileDescriptorsSet = {
  contractAddress: string;
  chainId: SupportedELFChainId;
};

export const getFileDescriptorsSet = async ({
  contractAddress,
  chainId,
}: GetFileDescriptorsSet) => {
  const aelf = getAElf(chainId);
  const fds = await aelf.chain.getContractFileDescriptorSet(contractAddress);
  return getServicesFromFileDescriptors(fds);
};

export const getServicesFromFileDescriptors = (descriptors: any) => {
  const root = AElf.pbjs.Root.fromDescriptor(descriptors, 'proto3').resolveAll();
  return descriptors.file
    .filter((f: any) => f.service.length > 0)
    .map((f: any) => {
      const sn = f.service[0].name;
      const fullName = f.package ? `${f.package}.${sn}` : sn;
      return root.lookupService(fullName);
    });
};

type CreateHandleManagerForwardCall = {
  caContractAddress: string;
  contractAddress: string;
  args: any;
  methodName: string;
  caHash: string;
};

export const createManagerForwardCall = async ({
  caContractAddress,
  contractAddress,
  args,
  methodName,
  caHash,
}: CreateHandleManagerForwardCall) => {
  if (!aelfInstance?.instance) return; // TODO aelfInstance.init()

  const res = await handleManagerForwardCall({
    paramsOption: {
      contractAddress,
      methodName,
      args,
      caHash,
    },
    functionName: ManagerForwardCall,
    instance: aelfInstance.instance,
  });
  res.args = Buffer.from(AElf.utils.uint8ArrayToHex(res.args), 'hex').toString('base64');

  const methods = await getContractMethods(aelfInstance.instance, caContractAddress);
  const protoInputType = methods[ManagerForwardCall];

  let input = AElf.utils.transform.transformMapToArray(protoInputType, res);

  input = AElf.utils.transform.transform(
    protoInputType,
    input,
    AElf.utils.transform.INPUT_TRANSFORMERS,
  );

  const message = protoInputType.fromObject(input);

  return protoInputType.encode(message).finish();
};

export type GetRawTx = {
  blockHeightInput: string;
  blockHashInput: string;
  packedInput: string;
  address: string;
  contractAddress: string;
  functionName: string;
};

export const getRawTx = ({
  blockHeightInput,
  blockHashInput,
  packedInput,
  address,
  contractAddress,
  functionName,
}: GetRawTx) => {
  const rawTx = AElf.pbUtils.getTransaction(address, contractAddress, functionName, packedInput);
  rawTx.refBlockNumber = blockHeightInput;
  const blockHash = blockHashInput.match(/^0x/) ? blockHashInput.substring(2) : blockHashInput;
  rawTx.refBlockPrefix = Buffer.from(blockHash, 'hex').slice(0, 4);
  return rawTx;
};

export const handleTransaction = async ({
  blockHeightInput,
  blockHashInput,
  packedInput,
  address,
  contractAddress,
  functionName,
}: GetRawTx) => {
  // Create transaction
  const rawTx = getRawTx({
    blockHeightInput,
    blockHashInput,
    packedInput,
    address,
    contractAddress,
    functionName,
  });
  rawTx.params = Buffer.from(rawTx.params, 'hex');

  const ser = AElf.pbUtils.Transaction.encode(rawTx).finish();

  const m = AElf.utils.sha256(ser);
  // signature
  const { signatureStr } = await portkeyWalletProvider.getSignature(m);
  if (!signatureStr) return;

  let tx = {
    ...rawTx,
    signature: Buffer.from(signatureStr, 'hex'),
  };

  tx = AElf.pbUtils.Transaction.encode(tx).finish();
  if (tx instanceof Buffer) {
    return tx.toString('hex');
  }
  return AElf.utils.uint8ArrayToHex(tx); // hex params
};

const isWrappedBytes = (resolvedType: any, name: string) => {
  if (!resolvedType.name || resolvedType.name !== name) {
    return false;
  }
  if (!resolvedType.fieldsArray || resolvedType.fieldsArray.length !== 1) {
    return false;
  }
  return resolvedType.fieldsArray[0].type === 'bytes';
};
const isAddress = (resolvedType: any) => isWrappedBytes(resolvedType, 'Address');

const isHash = (resolvedType: any) => isWrappedBytes(resolvedType, 'Hash');
export function transformArrayToMap(inputType: any, origin: any[]) {
  if (!origin) return '';
  if (!Array.isArray(origin)) return origin;
  if (origin.length === 0) return '';
  if (isAddress(inputType) || isHash(inputType)) return origin[0];

  const { fieldsArray } = inputType || {};
  const fieldsLength = (fieldsArray || []).length;

  if (fieldsLength === 0) return origin;

  if (fieldsLength === 1) {
    const i = fieldsArray[0];
    return { [i.name]: origin[0] };
  }

  let result = origin;
  Array.isArray(fieldsArray) &&
    Array.isArray(origin) &&
    fieldsArray.forEach((i, k) => {
      result = {
        ...result,
        [i.name]: origin[k],
      };
    });
  return result;
}

export const isElfChainSymbol = (symbol?: string | null) => {
  if (symbol && symbol.length >= 2 && symbol.length <= 10 && isSymbol(symbol)) return symbol;
  return false;
};

export const isELFChain = (chainId?: ChainId) => {
  return !!(typeof chainId === 'string' && SupportedELFChainId[chainId as SupportedELFChainId]);
};

export const getELFAddress = (address?: string): void | undefined | string => {
  if (!address) return;
  const list = address.split('_');
  if (list.length === 3 && isELFAddress(list[1])) return list[1];
};
