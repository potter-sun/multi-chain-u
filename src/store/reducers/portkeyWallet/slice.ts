import { createSlice } from '@reduxjs/toolkit';
import { Accounts, ChainIds, IPortkeyProvider } from '@portkey/provider-types';
import {
  setAccountsAction,
  setChainIdsAction,
  setConnectedInfoAction,
  setDisconnectedAction,
} from './actions';

export interface PortkeyWalletState {
  isActive: boolean; // is connected
  name: string;
  accounts?: Accounts;
  provider?: IPortkeyProvider;
  chainIds?: ChainIds;
  chainId?: string;
}

export const initialPortkeyWalletState: PortkeyWalletState = {
  isActive: false,
  name: '',
  accounts: {},
};

export const PortkeyWalletSlice = createSlice({
  name: 'portkeyWallet',
  initialState: initialPortkeyWalletState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAccountsAction, (state, action) => {
        state.accounts = action.payload;
      })
      .addCase(setChainIdsAction, (state, action) => {
        state.chainIds = action.payload;
      })
      .addCase(setConnectedInfoAction, (state, action) => {
        state.accounts = action.payload.accounts;
        state.isActive = action.payload.isActive;
        state.name = action.payload.name;
        // state.provider = action.payload.provider;
      })
      .addCase(setDisconnectedAction, () => ({ ...initialPortkeyWalletState }));
  },
});

export default PortkeyWalletSlice;
