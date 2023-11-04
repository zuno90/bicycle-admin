import { createSlice } from "@reduxjs/toolkit";

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
});

export const { loginAction, setAdmin } = authSlice.actions;
export default authSlice.reducer;
