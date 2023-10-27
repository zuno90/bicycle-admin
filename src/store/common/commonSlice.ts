import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  counterValue: 1,
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
      state.counterValue > 1 && state.counterValue--;
    },
    decrementByIndex: (state,action) => {
      
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counterValue += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = commonSlice.actions;
export default commonSlice.reducer;
