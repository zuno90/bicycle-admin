import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuth: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      if (action.payload.success) state.isAuth = true;
      else return initialState;
    },
    logoutAction: (state, action) => initialState,
    adminAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginAction, logoutAction, adminAction } = authSlice.actions;
export default authSlice.reducer;
