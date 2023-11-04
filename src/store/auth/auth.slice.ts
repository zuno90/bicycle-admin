import { createSlice } from "@reduxjs/toolkit";
import { clean } from "../common.action";

type TInitialState = { isAuth: boolean; user: any };

const initialState: TInitialState = { isAuth: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.isAuth = action.payload;
    },
    setAdmin: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(clean, () => initialState),
});

export const { loginAction, setAdmin } = authSlice.actions;
export default authSlice.reducer;
