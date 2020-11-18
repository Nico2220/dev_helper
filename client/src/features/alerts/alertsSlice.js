import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const alertsSlice = createSlice({
  name: "alerts",
  initialState,

  reducers: {
    setAlert: (state, action) => {
      state.push(action.payload);
    },

    removeAlert: (state, action) => {
      console.log("In removeAlert reducer", action.payload);
      state.pop();
    },
  },
});

export const { setAlert, removeAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
