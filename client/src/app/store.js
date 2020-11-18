import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/usersSlices";
import alertsReducer from "../features/alerts/alertsSlice";

export default configureStore({
  reducer: {
    users: userReducer,
    alerts: alertsReducer,
  },
});
