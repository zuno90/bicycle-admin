import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clean } from "../global.action";

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
  extraReducers: (builder) => builder.addCase(clean, () => initialState),
});

export const { increment, decrement, incrementByAmount } = commonSlice.actions;
export default commonSlice.reducer;
