import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    isPremium: false, // Whether the user is premium
    planNumber: null, // Current selected plan (null means no plan selected)
    sendMessage: 3, // Initial value for sendMessage
  },
  reducers: {
    setPremium: (state, action) => {
      state.isPremium = true;
      state.planNumber = action.payload; // Set the selected plan number

      // Increment sendMessage by 10 when user becomes premium
      state.sendMessage += 7;
    },
    resetSubscription: (state) => {
      state.isPremium = false;
      state.planNumber = null; // Reset the plan
    },
    setSendMessage: (state, action) => {
      let newMessageCount = action.payload;

      // Coerce the newMessageCount into a valid number
      newMessageCount = Number(newMessageCount);

      // Check if the newMessageCount is a valid number
      if (!isNaN(newMessageCount)) {
        state.sendMessage = newMessageCount; // Update sendMessage with a valid number
      } else {
        // If the newMessageCount is not a valid number, you can set a default value
        state.sendMessage = 0; // Or any fallback number you'd prefer
      }
    },
  },
});

export const { setPremium, resetSubscription, setSendMessage } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
