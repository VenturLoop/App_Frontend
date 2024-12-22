import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "route",
  initialState: {
    currentRoute: null, // Initialize with no route
  },
  reducers: {
    setRoute: (state, action) => {
      state.currentRoute = action.payload; // Update the current route
    },
  },
});

export const { setRoute } = routeSlice.actions;

export default routeSlice.reducer;
