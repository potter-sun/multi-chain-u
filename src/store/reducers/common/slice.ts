import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SideMenuKey, ChainItem, CHAIN_LIST } from 'constants/home';

export interface CommonState {
  isMobile: boolean;
  isMobilePX: boolean;
  activeMenuKey: SideMenuKey;
  chainItem: ChainItem;
}

export const initialState: CommonState = {
  isMobile: false,
  isMobilePX: false,
  activeMenuKey: SideMenuKey.Deposit,
  chainItem: CHAIN_LIST[0],
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
    setChainItem: (state, action: PayloadAction<ChainItem>) => {
      state.chainItem = action.payload;
    },
  },
});

export const { setIsMobile, setIsMobilePX, setActiveMenuKey, setChainItem } = CommonSlice.actions;

export default CommonSlice;
