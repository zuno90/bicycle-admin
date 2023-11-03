import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuth: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      if (action.payload.success) state.isAuth = true;
      else state = initialState;
    },
    logoutAction: (state, action) => {
      state = initialState;
    },
    setAdmin: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginAction, logoutAction, setAdmin } = authSlice.actions;
export default authSlice.reducer;
