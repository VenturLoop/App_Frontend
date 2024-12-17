import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import subscriptionReducer from "./slices/subscriptionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
