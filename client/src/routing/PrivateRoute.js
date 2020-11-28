import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const loading = useSelector((state) => state.users.loading);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
