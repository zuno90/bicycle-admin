import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuth: false, user: null };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

export default chatSlice.reducer;
