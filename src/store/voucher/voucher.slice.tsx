import { createSlice } from "@reduxjs/toolkit";
import { IVoucher } from "../../__types__";
import { clean } from "../common.action";

type TVoucherState = {
  voucherList: IVoucher[];
};

const initialState = {
  voucherList: [],
};

const voucherlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    setInitVoucherList: (state, action) => {
      state.voucherList = action.payload;
    },
    changeStatus: (state, action) => {},
  },
  extraReducers: (builder) => builder.addCase(clean, () => initialState),
});

export const { setInitVoucherList, changeStatus } = voucherlice.actions;
export default voucherlice.reducer;
