import CommonSlice from 'store/reducers/common/slice';
import { customCombineReducers } from 'store/utils/customCombineReducers';
import { persistReducer } from 'redux-persist';
import { commonPersistConfig, portkeyWalletPersistConfig } from './config';
import PortkeyWalletSlice from 'store/reducers/portkeyWallet/slice';

export const commonReducer = persistReducer(commonPersistConfig, CommonSlice.reducer);
export const portkeyWalletReducer = persistReducer(
  portkeyWalletPersistConfig,
  PortkeyWalletSlice.reducer,
);

const rootReducer = customCombineReducers({
  [CommonSlice.name]: CommonSlice.reducer,
  [PortkeyWalletSlice.name]: PortkeyWalletSlice.reducer,
});

export default rootReducer;
