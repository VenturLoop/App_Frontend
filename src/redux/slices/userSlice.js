import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  isPremium: false,
  isLogin: false,
  loginToken: "", // Store login token
  isSignup: false, // Track signup status
  signupToken: "", // Store signup token
  referalCode: "", // Store referral code
  forgateMail: "", // Store for forgot mail
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Update user fields
    updateUser: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    // Reset user state to initial values
    resetUser: () => initialState,

    // Update premium status
    setPremium: (state, action) => {
      state.isPremium = action.payload;
    },

    // Update login status and token
    setLogin: (state, action) => {
      const { isLogin, loginToken } = action.payload;
      state.isLogin = isLogin;
      state.loginToken = loginToken || "";
    },

    // Update signup status and token
    setSignup: (state, action) => {
      const { isSignup, signupToken } = action.payload;
      state.isSignup = isSignup;
      state.signupToken = signupToken || "";
    },

    // Set referral code
    setReferralCode: (state, action) => {
      state.referalCode = action.payload;
    },

    // Clear referral code
    clearReferralCode: (state) => {
      state.referalCode = "";
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
} = userSlice.actions;

export default userSlice.reducer;
