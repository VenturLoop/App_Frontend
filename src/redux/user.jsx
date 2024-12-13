import { createSlice } from "@reduxjs/toolkit";

createSlice({
  name: "user",
  initialState: {
    name: "",
    tag: "",
    bio: "",
    dob: "",
    location: "",
    lookingFor: [],
    skillset: [],
    commitmentLevel: "",
    interests: [],
    priorStartupExperience: [],
    equityExpectation: "",
  },
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
    },
  },
});
