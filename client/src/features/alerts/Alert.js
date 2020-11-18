import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export const Alert = () => {
  const alerts = useSelector((state) => state.alerts);
  console.log("alert = ", alerts);
  let renderAlert;

  if (alerts !== null && alerts.length > 0) {
    renderAlert = alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));
  }

  return <Fragment>{renderAlert}</Fragment>;
};
