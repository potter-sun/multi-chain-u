'use client';
import { WebLoginProvider, setGlobalConfig, PortkeyProvider } from 'aelf-web-login';
import { AelfReact, AppName } from 'constants/index';
import { ReactNode } from 'react';

setGlobalConfig({
  appName: AppName,
  chainId: 'AELF', // TODO
  networkType: 'MAIN',
  portkey: {},
  aelfReact: {
    appName: AppName,
    nodes: AelfReact,
  },
  defaultRpcUrl: AelfReact.AELF.rpcUrl,
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PortkeyProvider networkType={'MAIN'}>
      <WebLoginProvider
        nightElf={{
          connectEagerly: false,
        }}
        portkey={{
          autoShowUnlock: true,
          checkAccountInfoSync: true,
        }}
        discover={{
          autoRequestAccount: true,
          autoLogoutOnDisconnected: true,
          autoLogoutOnNetworkMismatch: false,
          autoLogoutOnAccountMismatch: false,
          autoLogoutOnChainMismatch: false,
          onPluginNotFound: (openStore) => {},
        }}
        extraWallets={['discover']}
      >
        {children}
      </WebLoginProvider>
    </PortkeyProvider>
  );
}
