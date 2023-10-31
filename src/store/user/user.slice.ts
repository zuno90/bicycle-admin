import { createSlice } from "@reduxjs/toolkit";
import { clean } from "../common.action";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder.addCase(clean, () => initialState),
});

export default userSlice.reducer;
