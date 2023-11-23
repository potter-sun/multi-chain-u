import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  isMobile: boolean;
}

export const initialState: CommonState = {
  isMobile: false,
};

//it automatically uses the immer library to let you write simpler immutable updates with normal mutative code
export const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = CommonSlice.actions;

export default CommonSlice;
