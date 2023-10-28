import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TCommonState = { counterValue: number };

const initialState: TCommonState = { counterValue: 0 };

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.counterValue++;
    },
    decrement: (state, action) => {
      console.log(action);
      state.counterValue >= 1 && state.counterValue--;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counterValue += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = commonSlice.actions;
export default commonSlice.reducer;
