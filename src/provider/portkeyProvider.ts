import {
  Accounts,
  ChainId,
  ChainIds,
  IPortkeyProvider,
  MethodsBase,
  MethodsWallet,
  NetworkType,
  NotificationEvents,
} from '@portkey/provider-types';
import detectProvider from '@portkey/detect-provider';
import { evokePortkey } from '@portkey/onboarding';
import elliptic from 'elliptic';
import { zeroFill } from 'utils/calculate';
import { LocalStorageKey } from 'constants/localStorage';
import { sleep } from 'utils/common';
import { did } from '@portkey/did-ui-react';

const ec = new elliptic.ec('secp256k1');
export interface IPortkeyWalletInfo {
  isActive: boolean; // is connected
  walletName: string;
  accounts?: Accounts;
  provider?: IPortkeyProvider;
  chainIds?: ChainIds;
  chainId?: string;
  matchNetworkType?: string;
  managerAddress?: string;
}

export interface IPortkeyWalletProvider extends IPortkeyWalletInfo {
  init: (props: PortkeyWalletProviderOptions) => Promise<void>;
  initListener: () => void;
  removeListener: () => void;
  setIsActive: (isActive: boolean) => void;
  setProvider: (provider: IPortkeyProvider) => void;
  setWalletName: (name: string) => void;
  setAccounts: (accounts: Accounts) => void;
  setChainIds: (chainIds: ChainIds) => void;
  setMatchNetworkType: (networkType: NetworkType) => void;
  setConnectInfo: (info: Omit<IPortkeyWalletInfo, 'isActive'>) => void;
  networkChanged: (networkType: NetworkType) => void;
  /**
   * The activate connection can optionally pass in a new node
   * @param nodes - @see PortkeyReactProviderProps.nodes
   */
  activate: () => Promise<void>;
  // deactivate connection
  deactivate: () => boolean;
  // try eagerly connection
  connectEagerly: () => Promise<void>;
  connected: () => Promise<void>;
  disconnected: () => void;
}

export interface PortkeyWalletProviderOptions {
  networkType: NetworkType;
}

class PortkeyWalletProvider implements IPortkeyWalletProvider {
  public isActive: boolean;
  public walletName: string;
  public accounts?: Accounts;
  public provider?: IPortkeyProvider;
  public chainIds?: ChainIds;
  public chainId?: ChainId;
  public matchNetworkType?: NetworkType;
  public managerAddress?: string;

  constructor() {
    this.isActive = false;
    this.walletName = '';
  }

  public async init({ networkType }: PortkeyWalletProviderOptions) {
    this.setMatchNetworkType(networkType);
    await this.getManagerAddress();
  }

  public setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }

  public setProvider(provider: IPortkeyProvider) {
    this.provider = provider;
  }

  public setWalletName(name: string) {
    this.walletName = name;
  }

  public setAccounts(accounts: Accounts) {
    this.accounts = accounts;
  }

  public setChainIds(chainIds: ChainIds) {
    this.chainIds = chainIds;
  }

  public setMatchNetworkType(networkType: NetworkType) {
    this.matchNetworkType = networkType;
  }

  // portkey wallet network changed
  public async networkChanged(networkType: NetworkType) {
    if (networkType !== this.matchNetworkType) {
      this.deactivate();
    }
  }

  public setConnectInfo({
    provider,
    walletName,
    accounts,
    chainIds,
  }: Omit<IPortkeyWalletInfo, 'isActive'>) {
    this.isActive = true;
    this.provider = provider || this.provider;
    this.walletName = walletName || this.walletName;
    this.accounts = accounts || this.accounts;
    this.chainIds = chainIds || this.chainIds;
  }

  private setDisconnectInfo() {
    this.isActive = false;
    this.provider = undefined;
    this.walletName = '';
    this.accounts = undefined;
    this.chainIds = undefined;
  }

  public async activate() {
    if (!this.matchNetworkType) throw Error('please set network type');
    const installed = await evokePortkey.extension();
    if (!installed) throw Error('provider not installed');

    const provider = await detectProvider();
    if (!provider) throw Error('provider init error');

    const accounts = await provider.request({ method: MethodsBase.REQUEST_ACCOUNTS });
    const [name, networkType] = await Promise.all([
      provider.request({ method: MethodsWallet.GET_WALLET_NAME }),
      provider.request({ method: MethodsBase.NETWORK }),
    ]);
    console.log('🌈 🌈 🌈 🌈 🌈 🌈 activate', name, networkType, accounts);
    if (networkType !== this.matchNetworkType) throw Error('networkType error');

    this.setConnectInfo({ provider, walletName: name, accounts });

    await sleep(500);
  }

  public deactivate() {
    if (!this.accounts) throw Error('no active connection');
    this.setDisconnectInfo();
    // remove JWT info form localStorage
    localStorage.removeItem(LocalStorageKey.TOKEN_TYPE);
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
    return true;
  }

  public async connectEagerly() {
    const provider = await detectProvider();
    if (!provider) throw Error('provider init error');

    const accounts = await provider.request({ method: MethodsBase.ACCOUNTS });
    if (Object.keys(accounts).length) return this.activate();
    throw Error(`Can't Connect Eagerly`);
  }

  public async connected() {
    if (!this.provider) return;
    const [accounts, name, networkType] = await Promise.all([
      this.provider.request({ method: MethodsBase.ACCOUNTS }),
      this.provider.request({ method: MethodsWallet.GET_WALLET_NAME }),
      this.provider.request({ method: MethodsBase.NETWORK }),
    ]);
    if (networkType !== this.matchNetworkType) return;

    this.setConnectInfo({ accounts, walletName: name });
  }

  public disconnected() {
    try {
      this.deactivate();
      // connectEagerly(); // TODO
    } catch (error) {
      console.log(error, '====disconnected error');
    }
  }

  public initListener() {
    if (!this.provider || !this.provider?.on) return;
    this.provider.on(NotificationEvents.ACCOUNTS_CHANGED, this.setAccounts);
    this.provider.on(NotificationEvents.CHAIN_CHANGED, this.setChainIds);
    this.provider.on(NotificationEvents.NETWORK_CHANGED, this.networkChanged);
    this.provider.on(NotificationEvents.CONNECTED, this.connected);
    this.provider.on(NotificationEvents.DISCONNECTED, this.disconnected);
  }

  public removeListener() {
    if (!this.provider || !this.provider?.removeListener) return;
    this.provider.removeListener(NotificationEvents.ACCOUNTS_CHANGED, this.setAccounts);
    this.provider.removeListener(NotificationEvents.CHAIN_CHANGED, this.setChainIds);
    this.provider.removeListener(NotificationEvents.NETWORK_CHANGED, this.networkChanged);
    this.provider.removeListener(NotificationEvents.CONNECTED, this.connected);
    this.provider.removeListener(NotificationEvents.DISCONNECTED, this.disconnected);
  }

  public async getManagerAddress() {
    const managerAddress = await this.provider?.request({
      method: MethodsWallet.GET_WALLET_CURRENT_MANAGER_ADDRESS,
    });
    this.managerAddress = managerAddress;
    return managerAddress;
  }

  public async getCaHashByManagerAddress() {
    if (!this.managerAddress) {
      await this.getManagerAddress();
    }
    const res = await did.didGraphQL.getHolderInfoByManager({
      chainId: 'AELF',
      manager: this.managerAddress || '',
    });
    return res;
  }

  public async getSignature(data: string) {
    if (!this.provider || !this.provider?.request) return {}; // TODO
    const signature = await this.provider.request({
      method: MethodsWallet.GET_WALLET_SIGNATURE,
      payload: { data },
    });
    if (!signature || signature.recoveryParam == null) return {}; // TODO
    const signatureStr = [
      zeroFill(signature.r),
      zeroFill(signature.s),
      `0${signature.recoveryParam.toString()}`,
    ].join('');
    return { signature, signatureStr };
  }

  public async getManagerPublicKey(data: string) {
    if (!this.provider || !this.provider?.request) return {}; // TODO

    const { signature, signatureStr } = await this.getSignature(data);
    if (!signature || signature.recoveryParam == null) return {}; // TODO

    // recover pubkey by signature
    const publicKey = ec.recoverPubKey(
      Buffer.from(data.slice(0, 64), 'hex'),
      signature,
      signature.recoveryParam,
    );
    const pubKey = ec.keyFromPublic(publicKey).getPublic('hex');

    return { signatureStr, pubKey };
  }
}

const portkeyWalletProvider = new PortkeyWalletProvider();

export default portkeyWalletProvider;
