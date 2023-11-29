import { useCallback } from 'react';
import { NETWORK_TYPE } from 'constants/index';
import portkeyWalletProvider from 'provider/portkeyProvider';
import { useAppDispatch } from 'store/Provider/hooks';
import {
  setConnectedInfoAction,
  setDisconnectedAction,
} from 'store/reducers/portkeyWallet/actions';
import { initialPortkeyWalletState } from 'store/reducers/portkeyWallet/slice';
import { sleep } from 'utils/common';
import { useEffectOnce } from 'react-use';

export interface PortkeyProviderResult {
  activate: () => Promise<void>;
  deactivate: () => boolean;
  connectEagerly: () => Promise<void>;
}

export function usePortkeyProvider(): PortkeyProviderResult {
  const dispatch = useAppDispatch();

  const initProvider = useCallback(async () => {
    await sleep(1000);
    portkeyWalletProvider.init({ networkType: NETWORK_TYPE });
    portkeyWalletProvider.initListener();
    return () => {
      portkeyWalletProvider.removeListener();
    };
  }, []);

  useEffectOnce(() => {
    initProvider();
  });

  const activate = useCallback(async () => {
    await portkeyWalletProvider.activate();
    dispatch(
      setConnectedInfoAction({
        accounts: portkeyWalletProvider.accounts,
        name: portkeyWalletProvider.walletName,
        isActive: true,
      }),
    );
  }, [dispatch]);

  const deactivate = useCallback(() => {
    const res = portkeyWalletProvider.deactivate();
    dispatch(setDisconnectedAction(initialPortkeyWalletState));
    return res;
  }, [dispatch]);

  const connectEagerly = useCallback(async () => {
    await portkeyWalletProvider.connectEagerly();
    dispatch(
      setConnectedInfoAction({
        accounts: portkeyWalletProvider.accounts,
        name: portkeyWalletProvider.walletName,
        isActive: true,
      }),
    );
  }, [dispatch]);

  return {
    activate,
    deactivate,
    connectEagerly,
  };
}

// export interface PortkeyProviderProps {
//   networkType: NetworkType;
// }

// export interface PortkeyProviderResult {
//   /**
//    * The activate connection can optionally pass in a new node
//    * @param nodes - @see PortkeyReactProviderProps.nodes
//    */
//   activate: () => Promise<void>;
//   // deactivate connection
//   deactivate: () => Promise<boolean>;
//   // try eagerly connection
//   connectEagerly: () => Promise<void>;
// }

// // TODO Singleton
// export function usePortkeyProvider({
//   networkType: propsNetworkType,
// }: PortkeyProviderProps): PortkeyProviderResult {
//   const dispatch = useAppDispatch();
//   const { accounts } = usePortkeyWallet();
//   const provider: any = {};

//   const activate = useCallback(async () => {
//     const installed = await evokePortkey.extension();
//     if (!installed) throw Error('provider not installed');

//     const provider = await detectProvider();
//     if (!provider) throw Error('provider init error');

//     const accounts = await provider.request({ method: MethodsBase.REQUEST_ACCOUNTS });
//     const [name, networkType] = await Promise.all([
//       provider.request({ method: MethodsWallet.GET_WALLET_NAME }),
//       provider.request({ method: MethodsBase.NETWORK }),
//     ]);
//     console.log('🌈 🌈 🌈 🌈 🌈 🌈 activate', name, networkType, accounts);
//     if (networkType !== propsNetworkType) throw Error('networkType error');

//     dispatch(
//       setConnectedInfoAction({
//         accounts,
//         name,
//         // provider,
//         isActive: true,
//       }),
//     );
//   }, [dispatch, propsNetworkType]);

//   const deactivate = useCallback(async () => {
//     if (!accounts) throw Error('no active connection');
//     dispatch(setDisconnectedAction(initialPortkeyWalletState));

//     return true;
//   }, [accounts, dispatch]);

//   const connectEagerly = useCallback(async () => {
//     const provider = await detectProvider();
//     if (!provider) throw Error('provider init error');

//     const accounts = await provider.request({ method: MethodsBase.ACCOUNTS });
//     if (Object.keys(accounts).length) return activate();
//     throw Error(`Can't Connect Eagerly`);
//   }, [activate]);

//   const accountsChanged = useCallback(
//     (accounts: Accounts) => {
//       dispatch(setAccountsAction(accounts));
//     },
//     [dispatch],
//   );

//   const chainChanged = useCallback(
//     (chainIds: ChainIds) => {
//       dispatch(setChainIdsAction(chainIds));
//     },
//     [dispatch],
//   );

//   const networkChanged = useCallback(
//     async (networkType: NetworkType) => {
//       if (networkType !== propsNetworkType) {
//         deactivate();
//       }
//     },
//     [deactivate, propsNetworkType],
//   );

//   const connected = useCallback(async () => {
//     if (!provider) return;
//     const [accounts, name, networkType] = await Promise.all([
//       provider.request({ method: MethodsBase.ACCOUNTS }),
//       provider.request({ method: MethodsWallet.GET_WALLET_NAME }),
//       provider.request({ method: MethodsBase.NETWORK }),
//     ]);
//     if (networkType !== propsNetworkType) return;

//     dispatch(
//       setConnectedInfoAction({
//         accounts,
//         name,
//         // provider,
//         isActive: true,
//       }),
//     );
//   }, [dispatch, propsNetworkType, provider]);

//   const disconnected = useCallback(() => {
//     try {
//       deactivate();
//       // connectEagerly(); // TODO
//     } catch (error) {
//       console.log(error, '====disconnected error');
//     }
//   }, [deactivate]);

//   const initListener = useCallback(() => {
//     if (!provider || !provider?.on) return;
//     provider.on(NotificationEvents.ACCOUNTS_CHANGED, accountsChanged);
//     provider.on(NotificationEvents.CHAIN_CHANGED, chainChanged);
//     provider.on(NotificationEvents.NETWORK_CHANGED, networkChanged);
//     provider.on(NotificationEvents.CONNECTED, connected);
//     provider.on(NotificationEvents.DISCONNECTED, disconnected);
//   }, [accountsChanged, chainChanged, connected, disconnected, networkChanged, provider]);

//   const removeListener = useCallback(() => {
//     if (!provider || !provider?.removeListener) return;
//     provider.removeListener(NotificationEvents.ACCOUNTS_CHANGED, accountsChanged);
//     provider.removeListener(NotificationEvents.CHAIN_CHANGED, chainChanged);
//     provider.removeListener(NotificationEvents.NETWORK_CHANGED, networkChanged);
//     provider.removeListener(NotificationEvents.CONNECTED, connected);
//     provider.removeListener(NotificationEvents.DISCONNECTED, disconnected);
//   }, [accountsChanged, chainChanged, connected, disconnected, networkChanged, provider]);

//   useEffect(() => {
//     if (!provider) return;
//     initListener();
//     return () => {
//       removeListener();
//     };
//   }, [initListener, provider, removeListener]);

//   return { activate, deactivate, connectEagerly };
// }
