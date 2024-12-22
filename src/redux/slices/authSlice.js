// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Default to no user
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      // Save the user data in the state
      state.user = action.payload;
    },
    clearUser: (state) => {
      // Clear user data
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
