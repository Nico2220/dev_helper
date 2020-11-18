import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert } from "../alerts/alertsSlice";
import setAuthtoken from "../../utils/setAuthToken";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    registerSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
    },

    registerFailed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.loading = false;
      state.token = null;
    },

    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },

    authError: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.loading = false;
      state.token = null;
    },

    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
    },

    loginFailed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.loading = false;
      state.token = null;
    },

    logout: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.loading = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const {
  registerSuccess,
  registerFailed,
  userLoaded,
  authError,
  loginSuccess,
  loginFailed,
  logout,
} = usersSlice.actions;

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthtoken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authError());
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch(registerSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
      );
    }
    dispatch(registerFailed());
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch(loginSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
      );
    }
    dispatch(loginFailed());
  }
};

export default usersSlice.reducer;
