import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoute: null, // Store the current route
  formData: {}, // Store the form data the user has filled in
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setCurrentRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
    saveFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetRoute: (state) => {
      state.currentRoute = null;
      state.formData = {};
    },
  },
});

export const { setCurrentRoute, saveFormData, resetRoute } = routeSlice.actions;
export default routeSlice.reducer;
