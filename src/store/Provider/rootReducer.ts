import CommonSlice from 'store/reducers/common/slice';
import { customCombineReducers } from 'store/utils/customCombineReducers';
import { persistReducer } from 'redux-persist';
import { commonPersistConfig } from './config';

export const commonReducer = persistReducer(commonPersistConfig, CommonSlice.reducer);

const rootReducer = customCombineReducers({
  [CommonSlice.name]: CommonSlice.reducer,
});

export default rootReducer;
