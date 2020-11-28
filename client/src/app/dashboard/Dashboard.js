import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile } from "../../features/profiles/profilesSlice";
import store from "../store";

export const Dashboard = () => {
  const auth = useSelector((state) => state.users.isAuthenticaded);
  const profile = useSelector((state) => state.profiles.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return <div className="d">Dashboardhhhhhhhhhhh</div>;
};
