import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import AlertContext from "../context/alert/AlertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className="text-center">
        <Alert key={alert.id} variant={alert.type}>
          {alert.msg}
        </Alert>
      </div>
    ))
  );
};

export default Alerts;
