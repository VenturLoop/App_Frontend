// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false, // Default to not logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setLoginStatus } = authSlice.actions;
export default authSlice.reducer;
