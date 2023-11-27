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

export interface IPortkeyWalletInfo {
  isActive: boolean; // is connected
  walletName: string;
  accounts?: Accounts;
  provider?: IPortkeyProvider;
  chainIds?: ChainIds;
  chainId?: string;
}

export interface IPortkeyWalletProvider extends IPortkeyWalletInfo {
  init: (props: PortkeyWalletProviderOptions) => void;
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

  constructor() {
    this.isActive = false;
    this.walletName = '';
  }

  public init({ networkType }: PortkeyWalletProviderOptions) {
    this.setMatchNetworkType(networkType);
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
    console.log('🌈 🌈 🌈 🌈 🌈 🌈 this.matchNetworkType', this.matchNetworkType);
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
  }

  public deactivate() {
    if (!this.accounts) throw Error('no active connection');
    this.setDisconnectInfo();
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
}

const portkeyWalletProvider = new PortkeyWalletProvider();

export default portkeyWalletProvider;
