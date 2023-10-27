import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TCommonState = {
  counterValue: number;
  counterList: number[];
};

const initialState: TCommonState = {
  counterValue: 0,
  counterList: [0],
};

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
    addByIndex: (state, action) => {
      state.counterList.push(action.payload);
    },
    removeByIndex: (state, action) => {
      console.log(state.counterList.length, 66);
      if (state.counterList.length > 0)
        state.counterList = state.counterList
          .filter((index) => index !== action.payload)
          .sort((a: number, b: number) => a - b);
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counterValue += action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  addByIndex,
  removeByIndex,
  incrementByAmount,
} = commonSlice.actions;
export default commonSlice.reducer;
