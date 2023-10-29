import { createSlice } from "@reduxjs/toolkit";
import { IVoucher } from "../../__types__";

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
});

export const { setInitVoucherList, changeStatus } = voucherlice.actions;
export default voucherlice.reducer;
