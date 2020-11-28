import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: null,
  profiles: [],
  repo: [],
  status: "idle",
  error: null,
};

export const getCurrentProfile = createAsyncThunk(
  "profiles/getCurrentProfile,",
  async () => {
    const res = await axios.get("/api/profile/me");
    return res.data;
  }
);

const profilesSlices = createSlice({
  name: "profiles",
  initialState,

  reducers: {
    clearProfile: (state, action) => {
      state.profile = null;
      state.repo = null;
    },
  },

  extraReducers: {
    [getCurrentProfile.pending]: (state, action) => {
      state.status = "loading";
    },

    [getCurrentProfile.fulfilled]: (state, action) => {
      state.status = "secceeded";
      state.profile = action.payload;
    },

    [getCurrentProfile.rejected]: (state, action) => {
      state.status = "Failed";
      state.error = action.error.message;
    },
  },
});

export const { clearProfile } = profilesSlices.actions;

export default profilesSlices.reducer;
