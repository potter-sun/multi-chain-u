import {
  ImmutableStateInvariantMiddlewareOptions,
  SerializableStateInvariantMiddlewareOptions,
} from '@reduxjs/toolkit';
import { reduxStorageRoot } from 'constants/store';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import CommonSlice from 'store/reducers/common/slice';
import PortkeyWalletSlice from 'store/reducers/portkeyWallet/slice';
import storage from './storage';

interface ThunkOptions<E = any> {
  extraArgument: E;
}

export interface DefaultMiddlewareOptions {
  thunk?: boolean | ThunkOptions;
  immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions;
  serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions;
}

export const commonPersistConfig = {
  key: CommonSlice.name,
  storage,
  blacklist: [''],
};

export const portkeyWalletPersistConfig = {
  key: PortkeyWalletSlice.name,
  storage,
  blacklist: [''],
};

const reduxPersistConfig = {
  key: reduxStorageRoot,
  storage,

  // Reducer keys that you do NOT want stored to persistence here.
  // blacklist: [],

  // Optionally, just specify the keys you DO want stored to persistence.
  // An empty array means 'don't store any reducers' -> infinite-red/ignite#409
  whitelist: [CommonSlice.name, PortkeyWalletSlice.name],
  // More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
  // transforms: [SetTokenTransform],
};

const defaultMiddlewareOptions: DefaultMiddlewareOptions = {
  thunk: true,
  serializableCheck: {
    // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const storeProviderConfig = {
  reduxPersistConfig,
  defaultMiddlewareOptions,
};

export default storeProviderConfig;
