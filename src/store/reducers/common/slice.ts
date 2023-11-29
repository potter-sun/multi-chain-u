import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChainNameItem, CHAIN_LIST } from 'constants/index';
import { SideMenuKey } from 'constants/home';

export interface CommonState {
  isMobile: boolean;
  isMobilePX: boolean;
  activeMenuKey: SideMenuKey;
  chainItem: ChainNameItem;
  currentSymbol: string;
}

export const initialState: CommonState = {
  isMobile: false,
  isMobilePX: false,
  activeMenuKey: SideMenuKey.Deposit,
  chainItem: CHAIN_LIST[0],
  currentSymbol: 'USDT',
};

//it automatically uses the immer library to let you write simpler immutable updates with normal mutative code
export const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setIsMobilePX: (state, action: PayloadAction<boolean>) => {
      state.isMobilePX = action.payload;
    },
    setActiveMenuKey: (state, action: PayloadAction<SideMenuKey>) => {
      state.activeMenuKey = action.payload;
    },
    setChainItem: (state, action: PayloadAction<ChainNameItem>) => {
      state.chainItem = action.payload;
    },
    setCurrentSymbol: (state, action: PayloadAction<string>) => {
      state.currentSymbol = action.payload;
    },
  },
});

export const { setIsMobile, setIsMobilePX, setActiveMenuKey, setChainItem, setCurrentSymbol } =
  CommonSlice.actions;

export default CommonSlice;
