import { provider } from 'web3-core';
import { ELFChainConstants } from 'constants/ChainConstants';
import { getContractMethods, transformArrayToMap, getTxResult, encodedTransfer } from './aelfUtils';
import { ChainId, ChainType } from 'types';
import { AElfDappBridge } from '@aelf-react/types';
import { checkAElfBridge } from './checkAElfBridge';
import { IAElfChain } from '@portkey/provider-types';
import { IContract } from '@portkey/types';
import { sleep } from './common';

export interface AbiType {
  internalType?: string;
  name?: string;
  type?: string;
  components?: AbiType[];
}

type SendOptions = {
  from?: string;
  gasPrice?: string;
  gas?: number;
  value?: number | string;
  nonce?: number;
  onMethod: 'transactionHash' | 'receipt' | 'confirmation';
};

export interface AbiItem {
  constant?: boolean;
  inputs?: AbiType[];
  name?: string;
  outputs?: AbiType[];
  payable?: boolean;
  stateMutability?: string;
  type?: string;
}

export interface ContractProps {
  contractABI?: AbiItem[];
  provider?: provider;
  contractAddress: string;
  chainId?: ChainId;
  aelfContract?: any;
  aelfInstance?: AElfDappBridge;
  viewContract?: any;
  portkeyChain?: IAElfChain;
}

interface ErrorMsg {
  error: {
    name?: string;
    code: number;
    message: string;
  };
}

type CallViewMethod = (
  functionName: string,
  paramsOption?: any,
  callOptions?: {
    defaultBlock: number | string;
    options?: any;
    callback?: any;
  },
) => Promise<any | ErrorMsg>;

type CallSendMethod = (
  functionName: string,
  account: string,
  paramsOption?: any,
  sendOptions?: SendOptions,
) => Promise<ErrorMsg> | Promise<any>;

export type ContractBasicErrorMsg = ErrorMsg;
export class ContractBasic {
  public address?: string;
  public callContract: PortkeyContractBasic | AElfContractBasic;
  public contractType: ChainType;

  constructor(options: ContractProps) {
    this.address = options.contractAddress;
    this.callContract = options.portkeyChain
      ? new PortkeyContractBasic(options)
      : new AElfContractBasic(options);

    this.contractType = 'ELF';
  }

  public callViewMethod: CallViewMethod = async (functionName, paramsOption) => {
    return this.callContract.callViewMethod(functionName, paramsOption);
  };

  public callSendMethod: CallSendMethod = async (functionName, paramsOption, sendOptions) => {
    console.log(paramsOption, '======callSendMethod-paramsOption');

    return this.callContract.callSendMethod(functionName, paramsOption, sendOptions);
  };
  public callSendPromiseMethod: CallSendMethod = async (functionName, paramsOption) => {
    return this.callContract.callSendPromiseMethod(functionName, paramsOption);
  };
  public encodedTx: CallViewMethod = async (functionName, paramsOption) => {
    if (this.callContract instanceof AElfContractBasic)
      return this.callContract.encodedTx(functionName, paramsOption);
  };
}

type AElfCallViewMethod = (functionName: string, paramsOption?: any) => Promise<any | ErrorMsg>;

type AElfCallSendMethod = (
  functionName: string,
  paramsOption?: any,
  sendOptions?: SendOptions,
) => Promise<ErrorMsg> | Promise<any>;

export class AElfContractBasic {
  public aelfContract: any;
  public viewContract?: any;
  public address: string;
  public methods?: any;
  public chainId: ChainId;
  public aelfInstance?: AElfDappBridge;
  constructor(options: ContractProps) {
    const { aelfContract, contractAddress, chainId, aelfInstance, viewContract } = options;
    this.address = contractAddress;
    this.aelfContract = aelfContract;
    this.chainId = chainId as ChainId;
    this.aelfInstance = aelfInstance;
    this.viewContract = viewContract;
    this.getFileDescriptorsSet(this.address);
  }
  getFileDescriptorsSet = async (address: string) => {
    try {
      this.methods = await getContractMethods(this.chainId, address);
    } catch (error) {
      throw new Error(
        JSON.stringify(error) + 'address:' + address + 'Contract:' + 'getContractMethods',
      );
    }
  };
  checkMethods = async () => {
    if (!this.methods) await this.getFileDescriptorsSet(this.address);
  };
  checkConnected = async () => {
    if (!this.aelfInstance) throw Error('aelfInstance is undefined');
    await checkAElfBridge(this.aelfInstance);
  };
  public callViewMethod: AElfCallViewMethod = async (functionName, paramsOption) => {
    const contract = this.viewContract || this.aelfContract;
    if (!contract) return { error: { code: 401, message: 'Contract init error1' } };
    try {
      await this.checkMethods();
      const functionNameUpper = functionName.replace(
        functionName[0],
        functionName[0].toLocaleUpperCase(),
      );
      const inputType = this.methods[functionNameUpper];

      const req = await contract[functionNameUpper].call(
        transformArrayToMap(inputType, paramsOption),
      );
      if (!req?.error && (req?.result || req?.result === null)) return req.result;
      return req;
    } catch (e) {
      return { error: e };
    }
  };

  public callSendMethod: AElfCallSendMethod = async (functionName, paramsOption, sendOptions) => {
    if (!this.aelfContract) return { error: { code: 401, message: 'Contract init error2' } };
    try {
      const { onMethod = 'receipt' } = sendOptions || {};
      await this.checkMethods();
      await this.checkConnected();
      const functionNameUpper = functionName.replace(
        functionName[0],
        functionName[0].toLocaleUpperCase(),
      );
      const inputType = this.methods[functionNameUpper];
      console.log(transformArrayToMap(inputType, paramsOption), '=Option');
      const req = await this.aelfContract[functionNameUpper](
        transformArrayToMap(inputType, paramsOption),
      );
      if (req.error) {
        return {
          error: {
            code: req.error.message?.Code || req.error,
            message: req.errorMessage?.message || req.error.message?.Message,
          },
        };
      }

      const { TransactionId } = req.result || req;
      if (onMethod === 'receipt') {
        await sleep(1000);
        try {
          return await getTxResult(this.chainId, TransactionId);
        } catch (error: any) {
          if (error.message) return { error };
          return {
            ...error,
            error: {
              code: req?.error?.message?.Code || req?.error,
              message: error.Error || req?.errorMessage?.message || req?.error?.message?.Message,
            },
          };
        }
      }
      return { TransactionId };
    } catch (error: any) {
      if (error.message) return { error };
      return { error: { message: error.Error || error.Status } };
    }
  };

  public encodedTx: AElfCallViewMethod = async (functionName, paramsOption) => {
    if (!this.aelfContract) return { error: { code: 401, message: 'Contract init error2' } };
    try {
      await this.checkMethods();
      const methodName = functionName.replace(functionName[0], functionName[0].toLocaleUpperCase());
      const inputType = this.methods[methodName];
      return encodedTransfer({ params: paramsOption, inputType });
    } catch (e) {
      return { error: e };
    }
  };

  public callSendPromiseMethod: AElfCallSendMethod = async (functionName, paramsOption) => {
    if (!this.aelfContract) return { error: { code: 401, message: 'Contract init error3' } };
    if (
      !ELFChainConstants.aelfInstances?.AELF.appName &&
      !ELFChainConstants.aelfInstances?.AELF.options
    )
      return { error: { code: 402, message: 'connect aelf' } };
    try {
      await this.checkMethods();
      return this.aelfContract[functionName](
        transformArrayToMap(this.methods[functionName], paramsOption),
      );
    } catch (e) {
      return { error: e };
    }
  };
}

export class PortkeyContractBasic {
  public contract?: IContract;
  public provider?: provider;
  public chainId: ChainId;
  public portkeyChain?: IAElfChain;
  public methods?: any;
  public address: string;
  constructor(options: ContractProps) {
    const { provider, contractAddress, chainId } = options;
    this.portkeyChain = options.portkeyChain;
    this.contract = this.portkeyChain?.getContract(options.contractAddress);
    this.address = contractAddress;
    this.provider = provider;
    this.chainId = chainId as ChainId;
    this.getFileDescriptorsSet(this.address);
  }

  getFileDescriptorsSet = async (address: string) => {
    try {
      this.methods = await getContractMethods(this.chainId, address);
    } catch (error) {
      throw new Error(
        JSON.stringify(error) + 'address:' + address + 'Contract:' + 'getContractMethods',
      );
    }
  };
  checkMethods = async () => {
    if (!this.methods) await this.getFileDescriptorsSet(this.address);
  };
  public callViewMethod: AElfCallViewMethod = async (functionName, paramsOption) => {
    const contract = this.contract;
    if (!contract) return { error: { code: 401, message: 'Contract init error1' } };
    try {
      await this.checkMethods();
      const functionNameUpper = functionName.replace(
        functionName[0],
        functionName[0].toLocaleUpperCase(),
      );
      const inputType = this.methods[functionNameUpper];

      const req = await contract.callViewMethod(
        functionNameUpper,
        transformArrayToMap(inputType, paramsOption),
      );
      console.log(
        req,
        transformArrayToMap(inputType, paramsOption),
        functionNameUpper,
        '=======callViewMethod',
      );

      if (req.error) return req;

      return req?.data || req;
    } catch (e) {
      return { error: e };
    }
  };

  public callSendMethod: AElfCallSendMethod = async (functionName, paramsOption, sendOptions) => {
    const contract = this.contract;

    if (!contract) return { error: { code: 401, message: 'Contract init error2' } };
    const { onMethod = 'receipt', ...options } = sendOptions || {};

    try {
      await this.checkMethods();
      const functionNameUpper = functionName.replace(
        functionName[0],
        functionName[0].toLocaleUpperCase(),
      );
      const inputType = this.methods[functionNameUpper];
      console.log(
        transformArrayToMap(inputType, paramsOption),
        paramsOption,
        functionNameUpper,
        '=callSendMethod',
      );
      const req = await contract.callSendMethod(
        functionNameUpper,
        '',
        transformArrayToMap(inputType, paramsOption),
        {
          onMethod,
          ...options,
        },
      );
      if (req.error) return req;
      return req?.data || req;
    } catch (error: any) {
      if (error.message) return { error };
      return { error: { message: error.Error || error.Status } };
    }
  };
  public callSendPromiseMethod: CallSendMethod = async (
    functionName,
    account,
    paramsOption,
    sendOptions,
  ) => {
    throw new Error('Method not implemented.');
  };
}
