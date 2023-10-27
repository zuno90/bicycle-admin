import { createSlice } from "@reduxjs/toolkit";

type TProductState = { isLoading: boolean; list: []; detail: any; error: null };

const initialState: TProductState = {
  isLoading: false,
  list: [],
  detail: null,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;
export default productSlice.reducer;
