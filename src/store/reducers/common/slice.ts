import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeMenuKey, ChainNameType } from 'constants/home';

export interface CommonState {
  isMobile: boolean;
  activeMenuKey: HomeMenuKey;
  chainId: ChainNameType;
}

export const initialState: CommonState = {
  isMobile: false,
  activeMenuKey: HomeMenuKey.Deposit,
  chainId: ChainNameType.MainChain,
};

//it automatically uses the immer library to let you write simpler immutable updates with normal mutative code
export const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setActiveMenuKey: (state, action: PayloadAction<HomeMenuKey>) => {
      state.activeMenuKey = action.payload;
    },
    setChainId: (state, action: PayloadAction<ChainNameType>) => {
      state.chainId = action.payload;
    },
  },
});

export const { setIsMobile, setActiveMenuKey, setChainId } = CommonSlice.actions;

export default CommonSlice;
