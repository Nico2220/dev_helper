import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/usersSlices";
import alertsReducer from "../features/alerts/alertsSlice";
import profilesRedurcer from "../features/profiles/profilesSlice";

export default configureStore({
  reducer: {
    users: userReducer,
    alerts: alertsReducer,
    profiles: profilesRedurcer,
  },
});
