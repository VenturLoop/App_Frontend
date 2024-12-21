import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import appReducer from "./slices/appSlice";
import subscriptionReducer from "./slices/subscriptionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    subscription: subscriptionReducer,
    app: appReducer,
  },
});

export default store;
