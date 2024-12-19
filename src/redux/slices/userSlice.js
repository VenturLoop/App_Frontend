import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  isPremium: false,
  isLogin: true,
  token: "", // Store login token
  userId: "", // Store unique user ID
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
      const { isLogin, token, userId } = action.payload;
      state.isLogin = isLogin;
      state.token = token || "";
      state.userId = userId || ""; // Update userId when logging in
    },
  },
});

export const { updateUser, resetUser, setPremium, setLogin } =
  userSlice.actions;

export default userSlice.reducer;
