import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  setIsMobile: boolean;
}

export const initialState: CommonState = {
  setIsMobile: false,
};

//it automatically uses the immer library to let you write simpler immutable updates with normal mutative code
export const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.setIsMobile = action.payload;
    },
  },
});

export const { setIsMobile } = CommonSlice.actions;

export default CommonSlice;
