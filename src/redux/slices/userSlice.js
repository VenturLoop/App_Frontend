import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  isPremium: false,
  isLogin: false,
  loginToken: "",
  isSignup: false,
  signupToken: "", 
  referalCode: "",
  forgateMail: "",
  userId: "",
  user: null, // Add user object to initial state
  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetUser: () => initialState,
    setPremium: (state, action) => {
      state.isPremium = action.payload;
    },
    setLogin: (state, action) => {
      const { isLogin, loginToken } = action.payload;
      state.isLogin = isLogin;
      state.loginToken = loginToken || "";
    },
    setSignup: (state, action) => {
      const { isSignup, signupToken } = action.payload;
      state.isSignup = isSignup;
      state.signupToken = signupToken || "";
    },
    setReferralCode: (state, action) => {
      state.referalCode = action.payload;
    },
    clearReferralCode: (state) => {
      state.referalCode = "";
    },
    // New reducer to set user object
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  updateUser,
  resetUser,
  setPremium,
  setLogin,
  setSignup,
  setReferralCode,
  clearReferralCode,
  setUser, // Export setUser action
} = userSlice.actions;

export default userSlice.reducer;
