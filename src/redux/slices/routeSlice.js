import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoute: null,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setCurrentRoute(state, action) {
      state.currentRoute = action.payload;
    },
  },
});

export const { setCurrentRoute } = routeSlice.actions;

export default routeSlice.reducer;
