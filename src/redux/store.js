import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import routeReducer from "./slices/routeSlice";
import appReducer from "./slices/appSlice";
import subscriptionReducer from "./slices/subscriptionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    subscription: subscriptionReducer,
    app: appReducer,
    route: routeReducer,
  },
});

export default store;
