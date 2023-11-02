import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clean } from "../common.action";

type TCommonState = {
  isOpenModal: boolean;
  modalId: number;
  counterValue: number;
};

const initialState: TCommonState = {
  isOpenModal: false,
  modalId: 0,
  counterValue: 0,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      if (action.payload.id) state.modalId = action.payload.id;
      state.isOpenModal = !state.isOpenModal;
    },
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

export const { toggleModal, increment, decrement, incrementByAmount } =
  commonSlice.actions;
export default commonSlice.reducer;
