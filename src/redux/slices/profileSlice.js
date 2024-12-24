// redux/userProfileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  name: "",
  email: "",
  password: "",
  referalCode: "",
  status: "", // New field for status
  profilePhoto: "", // New field for profile photo URL
  birthday: "", // New field for birthday
  bio: "", // New field for bio
  location: "", // New field for location
  skillSet: [], // New field for skill set
  industries: [], // New field for industries
  priorStartupExperience: "", // New field for prior startup experience
  commitmentLevel: "", // New field for commitment level
  equityExpectation: "", // New field for equity expectation
  education: [], // New field for education data (array of objects)
  experience: [], // New field for experience data (array of objects)
  projects: [], // New field for projects data (array of objects)
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload; // Handle user ID
    },
    setName: (state, action) => {
      state.name = action.payload; // Handle name
    },
    setEmail: (state, action) => {
      state.email = action.payload; // Handle email
    },
    setPassword: (state, action) => {
      state.password = action.payload; // Handle password
    },
    setReferalCode: (state, action) => {
      state.referalCode = action.payload; // Handle referral code
    },
    setStatus: (state, action) => {
      state.status = action.payload; // Handle status
    },
    setProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload; // Handle profile photo URL
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload; // Handle birthday
    },
    setBio: (state, action) => {
      state.bio = action.payload; // Handle bio text
    },
    setUserLocation: (state, action) => {
      state.location = action.payload; // Handle location
    },
    setSkillSet: (state, action) => {
      state.skillSet = action.payload; // Handle skill set
    },
    setIndustries: (state, action) => {
      state.industries = action.payload; // Handle industries
    },
    setPriorStartupExperience: (state, action) => {
      state.priorStartupExperience = action.payload; // Handle prior startup experience
    },
    setCommitmentLevel: (state, action) => {
      state.commitmentLevel = action.payload; // Handle commitment level
    },
    setEquityExpectation: (state, action) => {
      state.equityExpectation = action.payload; // Handle equity expectation
    },
    setEducation: (state, action) => {
      state.education = action.payload; // Handle education data (array of objects)
    },
    setExperience: (state, action) => {
      state.experience = action.payload; // Handle experience data (array of objects)
    },
    setProjects: (state, action) => {
      state.projects = action.payload; // Handle projects data (array of objects)
    },
    submitProfileData: (state) => {
      const {
        status,
        profilePhoto,
        birthday,
        bio,
        location,
        skillSet,
        industries,
        priorStartupExperience,
        commitmentLevel,
        equityExpectation,
        education,
        experience,
        projects,
      } = state;

      // Prepare API call data
      state.apiCallData = {
        status,
        profilePhoto,
        birthday,
        bio,
        location,
        skillSet,
        industries,
        priorStartupExperience,
        commitmentLevel,
        equityExpectation,
        education,
        experience,
        projects,
      };
    },
  },
});

export const {
  setUserId,
  setName,
  setEmail,
  setPassword,
  setReferalCode,
  setStatus,
  setProfilePhoto,
  setBirthday,
  setBio,
  setUserLocation,
  setSkillSet,
  setIndustries,
  setPriorStartupExperience,
  setCommitmentLevel,
  setEquityExpectation,
  setEducation,
  setExperience,
  setProjects,
  submitProfileData,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
